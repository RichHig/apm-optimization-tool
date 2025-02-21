# ml_scripts/preprocess_data.py
import pandas as pd
from sklearn.model_selection import train_test_split

# 1. Load the synthetic data
df = pd.read_csv("synthetic_transactions.csv")

# 2. Choose features and target
#    For success rate prediction, we'll use transaction_amount and processing_time as features.
X = df[["transaction_amount", "processing_time"]]
y = df["success_rate"]

# 3. Split into training (80%) and testing (20%)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Save training data so train_success_model.py can read it
X_train.to_csv("X_train.csv", index=False)
y_train.to_csv("y_train.csv", index=False)

print("Data preprocessing complete. X_train.csv and y_train.csv created.")
