# backend/app/services/payment_api.py
import os
import stripe
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Configure Stripe with your secret key
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

def create_test_charge(amount: int, currency: str = "usd", description: str = "Test Charge"):
    """
    Create a test charge using Stripe's API.
    :param amount: Amount in cents (e.g., 5000 for $50.00)
    :param currency: Currency code, default is "usd"
    :param description: Description for the charge
    :return: Stripe Charge object (as dict)
    """
    try:
        charge = stripe.Charge.create(
            amount=amount,
            currency=currency,
            source="tok_visa",  # a valid test token provided by Stripe
            description=description,
        )
        return charge
    except stripe.error.StripeError as e:
        # Log or handle errors as needed
        return {"error": str(e)}
