from pathlib import Path
from typing import List

def load_documents(directory: str) -> List[str]:
    """
    Load all text-based documents from a directory.
    Returns a list of raw document strings.
    """
    docs = []
    base_path = Path(directory)

    for file_path in base_path.glob('**/*'):
        if file_path.suffix.lower() in {".txt", ".md"}:
            with open(file_path, "r", encoding="utf-8") as f:
                docs.append(f.read())

    return docs


def load_documents_from_dir(directory: Path) -> list[str]:
    """
    Load all .txt and .md files from the given directory.
    Returns a list of raw document strings.
    """
    docs = []
    for file_path in directory.glob('*'):
        if file_path.is_file() and file_path.suffix.lower() in {".txt", ".md"}:
            try:
                with open(file_path, "r", encoding="utf-8", errors="replace") as f:
                    docs.append(f.read())
            except OSError:
                continue
    return docs