# app/generation/llm.py

import os
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get API key and validate
api_key = os.getenv("API_KEY")
if not api_key:
    raise ValueError(
        "API_KEY environment variable is not set. "
        "Please create a .env file with: API_KEY=your_groq_api_key"
    )

# Use Groq's OpenAI-compatible endpoint
client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1"
)

MODEL_NAME = "llama-3.1-8b-instant"
def generate_answer(prompt: str) -> str:
    """
    Generate an answer using Groq LLM.
    """

    if not prompt.strip():
        return "No prompt provided."

    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {
                    "role": "system",
                    "content": "Answer ONLY using the provided context. If the answer is not in the context, say you don't know."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        return f"LLM error: {str(e)}"