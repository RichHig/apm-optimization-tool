# backend/app/endpoints/payment_trend.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/trend")
async def get_payment_trend():
    """
    Simulated payment trend data.
    In a real application, this data might be fetched from a database or an external API.
    """
    # Example of simulated trend data: an array of time and amount values.
    trend_data = [
        {"time": "09:00", "amount": 2000},
        {"time": "10:00", "amount": 3500},
        {"time": "11:00", "amount": 3000},
        {"time": "12:00", "amount": 4500},
        {"time": "13:00", "amount": 4000},
        {"time": "14:00", "amount": 5000},
        {"time": "15:00", "amount": 4800},
    ]
    return trend_data
