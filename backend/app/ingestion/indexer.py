import json
import faiss
import numpy as np
from app.config import VECTOR_STORE_DIR, EMBEDDING_DIM
def build_and_save_index(
    embeddings: list[list[float]],
    chunks: list[str]
) -> None:
    """
    Build a FAISS index from embeddings and persist
    both the index and the corresponding text chunks to disk.
    """
    VECTOR_STORE_DIR.mkdir(parents=True, exist_ok=True)
    index = faiss.IndexFlatL2(EMBEDDING_DIM)
    vectors = np.array(embeddings).astype("float32")
    index.add(vectors)
    index_path = VECTOR_STORE_DIR / "index.faiss"
    faiss.write_index(index, str(index_path))
    chunks_path = VECTOR_STORE_DIR / "chunks.json"
    with open(chunks_path, "w", encoding="utf-8") as f:
        json.dump(chunks, f, ensure_ascii=False, indent=2)
    print(f"Saved FAISS index to {index_path}")
    print(f"Saved {len(chunks)} chunks to {chunks_path}")






