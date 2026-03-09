import json
import faiss
import numpy as np
from pathlib import Path

from app.config import VECTOR_STORE_DIR, TOP_K
from app.ingestion.embedder import embed_texts


class Retriever:
    def __init__(self, index_dir: Path | None = None):
        """
        Load FAISS index and chunks. If index_dir is None, use global VECTOR_STORE_DIR.
        Otherwise use index_dir (e.g. for session uploads).
        """
        base = Path(index_dir) if index_dir is not None else VECTOR_STORE_DIR
        index_path = base / "index.faiss"
        chunks_path = base / "chunks.json"

        if not index_path.exists():
            raise FileNotFoundError(
                f"FAISS index not found at {index_path}. "
                "Run ingestion or upload documents first."
            )
        if not chunks_path.exists():
            raise FileNotFoundError(
                f"Chunks file not found at {chunks_path}. "
                "Run ingestion or upload documents first."
            )

        self.index = faiss.read_index(str(index_path))
        with open(chunks_path, "r", encoding="utf-8") as f:
            self.chunks: list[str] = json.load(f)

    def retrieve(self, query: str, top_k: int = TOP_K) -> list[str]:
        query_embedding = embed_texts([query])[0]
        query_vector = np.array([query_embedding]).astype("float32")
        distances, indices = self.index.search(query_vector, top_k)
        return [self.chunks[i] for i in indices[0]]