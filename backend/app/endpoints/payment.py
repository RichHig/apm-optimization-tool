# backend/app/endpoints/payment.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.payment_api import create_test_charge

router = APIRouter()

class PaymentRequest(BaseModel):
    amount: int  # in cents
    currency: str = "usd"
    description: str = "Test Charge"

@router.post("/create_charge")
async def create_charge(data: PaymentRequest):
    """
    Create a test charge using Stripe's API.
    """
    result = create_test_charge(
        amount=data.amount,
        currency=data.currency,
        description=data.description
    )
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result
