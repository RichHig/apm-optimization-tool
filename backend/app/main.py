
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.endpoints import (
    transactions, 
    advanced_transactions, 
    fee_optimization, 
    payment, 
    payment_trend,
    apm_market_share,  
    fraud_details
)

app = FastAPI(title="APM Optimization Tool API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transactions.router, prefix="/api/transactions")
app.include_router(advanced_transactions.router, prefix="/api/advanced")
app.include_router(fee_optimization.router, prefix="/api/advanced")
app.include_router(payment.router, prefix="/api/payment")
app.include_router(payment_trend.router, prefix="/api/payment")
app.include_router(apm_market_share.router, prefix="/api/apm")  
app.include_router(fraud_details.router, prefix="/api/advanced") 

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

