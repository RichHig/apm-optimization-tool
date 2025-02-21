# backend/app/endpoints/fee_optimization.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class FeeOptimizationInput(BaseModel):
    merchant_id: int
    transaction_amount: float
    currency: str = "USD"

@router.post("/fee_optimization")
async def fee_optimization(data: FeeOptimizationInput):
    """
    Simulate fee optimization by comparing fees of different APMs.
    """
    try:
        # Dummy fee percentages for different APMs
        fees = {
            "Stripe": 0.029,      # 2.9% fee
            "PayPal": 0.034,      # 3.4% fee
            "OpenBanking": 0.015  # 1.5% fee
        }
        # Calculate fee amounts based on the transaction amount
        fee_results = {
            apm: data.transaction_amount * fee for apm, fee in fees.items()
        }
        # Determine the APM with the lowest fee
        recommended_apm = min(fee_results, key=fee_results.get)
        return {
            "fee_results": fee_results,
            "recommended_apm": recommended_apm
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

