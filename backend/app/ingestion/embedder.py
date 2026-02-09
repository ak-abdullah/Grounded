from sentence_transformers import SentenceTransformer
from app.config import EMBEDDING_MODEL_NAME
model = SentenceTransformer(EMBEDDING_MODEL_NAME)

def embed_texts(texts: list[str]) -> list[list[float]]:
    """
    Convert a list of texts into embedding vectors.
    """ 
    embeddings = model.encode(texts, convert_to_numpy=True)
    return embeddings.tolist()