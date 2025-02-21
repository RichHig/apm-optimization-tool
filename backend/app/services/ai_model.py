# backend/app/services/ai_model.py

def get_apm_recommendations(data: dict):
    """
    Dummy function to simulate APM recommendations.
    In a real scenario, this function would process the data, run ML models, and produce dynamic recommendations.
    """
    transactions = data.get("transaction_history", [])
    if not transactions:
        return []

    # Dummy scores for different APMs
    apm_scores = {
        "Stripe": 0.95,
        "PayPal": 0.90,
        "OpenBanking": 0.85
    }
    # Return the recommendations sorted by score (highest first)
    recommendations = sorted(apm_scores.items(), key=lambda x: x[1], reverse=True)
    return recommendations
