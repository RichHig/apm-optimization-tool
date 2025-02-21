# backend/app/endpoints/apm_market_share.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/market_share")
async def get_market_share():
    """
    Simulated endpoint that returns APM market share data.
    In a real application, this data might be calculated from transaction records.
    """
    market_data = [
        {"apm": "Stripe", "value": 40},
        {"apm": "PayPal", "value": 35},
        {"apm": "OpenBanking", "value": 25},
    ]
    return market_data
