from typing import List
import re

def chunk_document(text: str, chunk_size: int = 500, overlap_ratio: float = 0.1) -> List[str]:
    """
    Chunk text into semantically coherent pieces with overlap.
    """

    paragraphs = [p.strip() for p in text.split('\n\n') if p.strip()]

    chunks = []
    current_chunk = []
    current_length = 0

    for para in paragraphs:
        para_length = len(para.split())

        if current_length + para_length > chunk_size:
            chunk_text = "\n\n".join(current_chunk)
            chunks.append(chunk_text)

            overlap_words = int(chunk_size * overlap_ratio)
            overlap_text = " ".join(current_chunk[-overlap_words:])
            current_chunk = [overlap_text, para]
            current_length = overlap_words + para_length
        else:
            current_chunk.append(para)
            current_length += para_length
        
        if current_chunk:
            chunks.append("\n\n".join(current_chunk))
    return chunks
        
    
    