from app.retrieval.retriever import Retriever

r = Retriever()
results = r.retrieve("What is conditional rendering?")

for i, chunk in enumerate(results, 1):
    print(f"\n--- Result {i} ---\n{chunk}")
