# app/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.retrieval.retriever import Retriever
from app.generation.prompt import build_prompt
from app.generation.llm import generate_answer

app = FastAPI(title="RAG Pipeline API")

retriever = Retriever()

class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    answer: str

@app.post("/query", response_model=QueryResponse)
async def query(request: QueryRequest):
    try:
        if not request.question.strip():
            raise HTTPException(status_code=400, detail="Question cannot be empty")
        
        chunks = retriever.retrieve(request.question)
        prompt = build_prompt(request.question, chunks)
        answer = generate_answer(prompt)
        
        return QueryResponse(answer=answer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "healthy"}