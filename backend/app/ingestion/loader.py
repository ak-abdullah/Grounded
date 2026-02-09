from pathlib import Path
from app.config import RAW_DATA_DIR

def load_documents() -> list[str]:
    """
    Load all text-based documents from a directory.
    Returns a list of raw document strings.
    """
    docs = []
    base_path = Path(RAW_DATA_DIR)

    for file_path in base_path.glob('**/*'):
        if file_path.suffix.lower() in {".txt", ".md"}:
            with open(file_path, "r", encoding="utf-8") as f:
                docs.append(f.read())

    return docs
