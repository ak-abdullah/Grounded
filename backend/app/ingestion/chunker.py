from app.config import CHUNK_SIZE, CHUNK_OVERLAP

def chunk_document(text: str) -> list[str]:
    """
    Split text into fixed-size overlapping character chunks.
    """
    chunks: list[str] = []

    start = 0
    text_length = len(text)

    while start < text_length:
        end = start + CHUNK_SIZE
        chunk = text[start:end]

        if chunk.strip():
            chunks.append(chunk)

        start = end - CHUNK_OVERLAP

    return chunks
