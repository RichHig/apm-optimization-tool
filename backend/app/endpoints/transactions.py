# backend/app/endpoints/transactions.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.ai_model import get_apm_recommendations

router = APIRouter()

# Define a Pydantic model for the incoming request data
class TransactionData(BaseModel):
    merchant_id: int
    location: str
    transaction_history: list  # You can refine this model later

@router.post("/recommend")
async def recommend_apm(data: TransactionData):
    try:
        recommendations = get_apm_recommendations(data.dict())
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
