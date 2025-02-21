# ml_scripts/generate_data.py
import numpy as np
import pandas as pd

# Set seed for reproducibility
np.random.seed(42)

# Generate synthetic data for 1000 transactions
num_samples = 1000
data = {
    "transaction_amount": np.random.uniform(10, 500, num_samples),  # $10 to $500
    "processing_time": np.random.uniform(0.5, 5, num_samples),        # in seconds
    "merchant_id": np.random.randint(1, 50, num_samples),             # 50 merchants
}

# Calculate a dummy success rate influenced by amount and processing time
data["success_rate"] = (
    0.5 
    + (data["transaction_amount"] / 1000) 
    - (data["processing_time"] / 10)
    + np.random.normal(0, 0.05, num_samples)  # noise
)
data["success_rate"] = np.clip(data["success_rate"], 0, 1)

# Save to CSV
df = pd.DataFrame(data)
df.to_csv("synthetic_transactions.csv", index=False)
print("Synthetic data generated and saved as synthetic_transactions.csv")
