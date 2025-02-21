# backend/app/endpoints/advanced_transactions.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.advanced_ai import predict_success_rate, detect_anomaly

router = APIRouter()

# Pydantic model for incoming transaction data
class AdvancedTransaction(BaseModel):
    merchant_id: int
    transaction_amount: float
    processing_time: float

@router.post("/predict_success")
async def predict_success(data: AdvancedTransaction):
    try:
        prediction = predict_success_rate({
            "transaction_amount": data.transaction_amount,
            "processing_time": data.processing_time
        })
        return {"predicted_success_rate": prediction}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/detect_fraud")
async def detect_fraud(data: AdvancedTransaction):
    try:
        is_anomaly = detect_anomaly({
            "transaction_amount": data.transaction_amount,
            "processing_time": data.processing_time
        })
        return {"is_fraud": is_anomaly}  # This is now a Python bool, so no error
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

