import requests
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from .auth import get_current_user

router = APIRouter()

class PromptRequest(BaseModel):
    prompt: str

@router.post("/ai/generate")
def ai_generate(request: PromptRequest, current_user=Depends(get_current_user)):
    """
    Forwards the prompt to the ai_service and returns the AI-generated content.
    """
    try:
        response = requests.post(
            "http://127.0.0.1:8001/generate",  # Use localhost and correct port when running locally
            json={"prompt": request.prompt},
            timeout=30
        )
        response.raise_for_status()
        data = response.json()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")
