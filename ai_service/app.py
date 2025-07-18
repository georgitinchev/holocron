import os
import requests
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# Load Hugging Face API key from environment variable
HF_API_KEY = os.getenv("HF_API_KEY")
if not HF_API_KEY:
    raise RuntimeError("HF_API_KEY environment variable not set.")

API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-base"
headers = {"Authorization": f"Bearer {HF_API_KEY}"}

app = FastAPI()

class AIRequest(BaseModel):
    prompt: str

@app.post("/generate")
def generate_content(request: AIRequest):
    payload = {"inputs": request.prompt}
    response = requests.post(API_URL, headers=headers, json=payload)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Hugging Face API error")
    data = response.json()
    # Hugging Face returns a list of dicts with 'generated_text' or 'summary_text' or similar
    if isinstance(data, list) and data and 'generated_text' in data[0]:
        return {"result": data[0]['generated_text']}
    elif isinstance(data, list) and data and 'summary_text' in data[0]:
        return {"result": data[0]['summary_text']}
    elif isinstance(data, list) and data:
        return {"result": data[0]}
    return {"result": data}
