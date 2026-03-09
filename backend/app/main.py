# app/main.py
import re
from pathlib import Path

from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from pydantic import BaseModel

from app.config import UPLOADS_DIR, ALLOWED_EXTENSIONS, MAX_FILE_SIZE_BYTES, MAX_FILES_PER_UPLOAD
from app.generation.llm import generate_answer
from app.generation.prompt import build_prompt
from app.ingestion.chunker import chunk_document
from app.ingestion.embedder import embed_texts
from app.ingestion.indexer import build_and_save_index_to_dir
from app.ingestion.loader import load_documents_from_dir
from app.retrieval.retriever import Retriever

app = FastAPI(title="RAG Pipeline API")


def _safe_session_id(session_id: str) -> bool:
    """Allow only UUID-like and alphanumeric-dash to avoid path traversal."""
    return bool(session_id and re.match(r"^[a-zA-Z0-9\-]{1,128}$", session_id))


class QueryRequest(BaseModel):
    question: str
    session_id: str | None = None


class QueryResponse(BaseModel):
    answer: str


@app.post("/chat", response_model=QueryResponse)
async def query(request: QueryRequest):
    try:
        if not request.question.strip():
            raise HTTPException(status_code=400, detail="Question cannot be empty")

        session_id = request.session_id
        if not session_id or not _safe_session_id(session_id):
            raise HTTPException(
                status_code=400,
                detail="Invalid or missing session_id. Upload documents first.",
            )

        session_dir = UPLOADS_DIR / session_id
        index_path = session_dir / "index.faiss"
        if not index_path.exists():
            raise HTTPException(
                status_code=400,
                detail="Upload documents first.",
            )

        retriever = Retriever(index_dir=session_dir)
        chunks = retriever.retrieve(request.question)
        prompt = build_prompt(request.question, chunks)
        answer = generate_answer(prompt)
        return QueryResponse(answer=answer)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error.")


@app.post("/upload")
async def upload(
    session_id: str = Form(...),
    files: list[UploadFile] = File(...),
):
    if not _safe_session_id(session_id):
        raise HTTPException(status_code=400, detail="Invalid session_id.")

    if not files:
        raise HTTPException(status_code=400, detail="No files provided.")

    if len(files) > MAX_FILES_PER_UPLOAD:
        raise HTTPException(
            status_code=400,
            detail=f"Too many files. Maximum is {MAX_FILES_PER_UPLOAD}.",
        )

    session_dir = UPLOADS_DIR / session_id
    session_dir.mkdir(parents=True, exist_ok=True)

    saved = 0
    for f in files:
        if not f.filename:
            continue
        ext = Path(f.filename).suffix.lower()
        if ext not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail=f"File type not allowed: {f.filename}. Use .txt or .md only.",
            )
        content = await f.read()
        if len(content) > MAX_FILE_SIZE_BYTES:
            raise HTTPException(
                status_code=400,
                detail=f"File too large: {f.filename}. Max {MAX_FILE_SIZE_BYTES // (1024*1024)} MB.",
            )
        out_path = session_dir / Path(f.filename).name
        out_path.write_bytes(content)
        saved += 1

    if saved == 0:
        raise HTTPException(status_code=400, detail="No valid files to save.")

    # Process: load from session dir, chunk, embed, save index to session dir
    docs = load_documents_from_dir(session_dir)
    if not docs:
        raise HTTPException(
            status_code=400,
            detail="No readable text found in uploaded files.",
        )

    chunks = []
    for doc in docs:
        chunks.extend(chunk_document(doc))

    if not chunks:
        raise HTTPException(
            status_code=400,
            detail="No content could be chunked from the uploaded files.",
        )

    embeddings = embed_texts(chunks)
    build_and_save_index_to_dir(embeddings, chunks, session_dir)

    return {"ok": True, "session_id": session_id, "count": saved}


@app.get("/health")
async def health():
    return {"status": "healthy"}