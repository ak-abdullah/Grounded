
import json

import faiss
import numpy as np

from app.config import VECTOR_STORE_DIR, TOP_K
from app.ingestion.embedder import embed_texts

class Retriever:
    def __init__(self):
        index_path = VECTOR_STORE_DIR / "index.faiss"
        chunks_path = VECTOR_STORE_DIR / "chunks.json"
        
        if not index_path.exists():
            raise FileNotFoundError(
                f"FAISS index not found at {index_path}. "
                "Run 'python run_ingestion.py' first."
            )
        if not chunks_path.exists():
            raise FileNotFoundError(
                f"Chunks file not found at {chunks_path}. "
                "Run 'python run_ingestion.py' first."
            )
        
        self.index = faiss.read_index(str(index_path))
        with open(chunks_path, "r", encoding="utf-8") as f:
            self.chunks: list[str] = json.load(f)
   
    def retrieve(self, query: str, top_k: int = TOP_K) -> list[str]:
        """
        Retrieve the top-k most relevant chunks for a query.
        """
        query_embedding = embed_texts([query])[0]
        query_vector = np.array([query_embedding]).astype("float32")
        distances, indices = self.index.search(query_vector, top_k)
        return [self.chunks[i] for i in indices[0]]


       