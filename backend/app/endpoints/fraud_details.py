# backend/app/endpoints/fraud_details.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/fraud_details")
async def get_fraud_details():
    """
    Simulated endpoint that returns detailed fraud data.
    In a production system, you might query a database for recent fraudulent transactions.
    """
    # Dummy data: Replace with real data as needed.
    fraud_data = [
        {
            "id": "txn_123",
            "amount": 100,
            "status": "flagged",
            "date": "2025-01-15T10:00:00Z"
        },
        {
            "id": "txn_456",
            "amount": 250,
            "status": "flagged",
            "date": "2025-01-16T12:30:00Z"
        }
    ]
    return fraud_data

