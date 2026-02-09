# app/config.py
from pathlib import Path

# =========================
# Paths
# =========================

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
RAW_DATA_DIR = DATA_DIR / "raw"
PROCESSED_DATA_DIR = DATA_DIR / "processed"
VECTOR_STORE_DIR = PROCESSED_DATA_DIR / "vector_store"

# =========================
# Chunking
# =========================

CHUNK_SIZE = 500          # characters
CHUNK_OVERLAP = 50       # characters

# =========================
# Embeddings (LOCAL)
# =========================

EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"
EMBEDDING_DIM = 384       # IMPORTANT: MiniLM dimension

# =========================
# Retrieval
# =========================

TOP_K = 5

# =========================
# Generation (NOT YET IMPLEMENTED)
# =========================
# Placeholder — no LLM yet
LLM_TEMPERATURE = 0.0

# =========================
# Misc
# =========================

RANDOM_SEED = 42
