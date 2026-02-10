from app.retrieval.retriever import Retriever
from app.generation.prompt import build_prompt
from app.generation.llm import generate_answer

question = "What is conditional rendering?"

retriever = Retriever()
chunks = retriever.retrieve(question)

prompt = build_prompt(question, chunks)
answer = generate_answer(prompt)

print(answer)
