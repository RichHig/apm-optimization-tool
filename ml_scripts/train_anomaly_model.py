# ml_scripts/train_anomaly_model.py
import pandas as pd
import pickle
from sklearn.ensemble import IsolationForest

df = pd.read_csv("synthetic_transactions.csv")

# Use transaction_amount and processing_time for anomaly detection
X = df[["transaction_amount", "processing_time"]]

iso_forest = IsolationForest(contamination=0.05, random_state=42)
iso_forest.fit(X)

# Save the anomaly model to the backend/models folder
with open("../backend/models/anomaly_model.pkl", "wb") as f:
    pickle.dump(iso_forest, f)

print("Anomaly detection model trained and saved as ../backend/models/anomaly_model.pkl")
