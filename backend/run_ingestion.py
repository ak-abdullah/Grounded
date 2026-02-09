from app.ingestion.loader import load_documents
from app.ingestion.chunker import chunk_document
from app.ingestion.embedder import embed_texts
from app.ingestion.indexer import build_and_save_index

# 1. Load raw documents
documents = load_documents()

# 2. Chunk documents
chunks = []
for doc in documents:
    chunks.extend(chunk_document(doc))

# 3. Embed chunks
embeddings = embed_texts(chunks)

# 4. Build and save FAISS index
build_and_save_index(embeddings, chunks)

print("Ingestion complete.")
