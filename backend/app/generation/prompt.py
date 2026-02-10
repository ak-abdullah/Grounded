def build_prompt(question: str, context_chunks: list[str]) -> str:
    """
    Build a prompt for the language model using retrieved context.
    """

    context = "\n\n---\n\n".join(context_chunks)
    prompt = f"""
        You are an assistant answering questions using the provided context.

    Context:
        {context}

    Question:
        {question}

    Answer:
""".strip()  

    return prompt