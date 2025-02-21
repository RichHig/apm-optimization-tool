# backend/app/services/advanced_ai.py
import os
import pickle
import numpy as np
import pandas as pd

# Define paths for model files (adjust if needed)
BASE_DIR = os.path.join(os.path.dirname(__file__), "../../models")
SUCCESS_MODEL_PATH = os.path.join(BASE_DIR, "success_model.pkl")

CLUSTER_MODEL_PATH = os.path.join(BASE_DIR, "clustering_model.pkl")
ANOMALY_MODEL_PATH = os.path.join(BASE_DIR, "anomaly_model.pkl")

# Load success model
try:
    with open(SUCCESS_MODEL_PATH, "rb") as f:
        success_model = pickle.load(f)
    print("Success model loaded successfully.")
except Exception as e:
    print("Error loading success model:", e)
    success_model = None

# Load clustering model
try:
    with open(CLUSTER_MODEL_PATH, "rb") as f:
        clustering_model = pickle.load(f)
    print("Clustering model loaded successfully.")
except Exception as e:
    print("Error loading clustering model:", e)
    clustering_model = None

# Load anomaly model
try:
    with open(ANOMALY_MODEL_PATH, "rb") as f:
        anomaly_model = pickle.load(f)
    print("Anomaly model loaded successfully.")
except Exception as e:
    print("Error loading anomaly model:", e)
    anomaly_model = None

def predict_success_rate(features: dict):
    if not success_model:
        print("Success model is not loaded!", flush=True)
        return None
    X = np.array([[features["transaction_amount"], features["processing_time"]]])
    print("Input features for prediction:", X, flush=True)
    predicted = success_model.predict(X)[0]
    print("Predicted success rate:", predicted, flush=True)
    return predicted

def detect_anomaly(transaction: dict):
    """
    Detects if a transaction is anomalous (fraud).
    Expected keys: 'transaction_amount', 'processing_time'
    Returns True if the transaction is flagged as fraud, False otherwise.
    """
    if not anomaly_model:
        print("Anomaly model is not loaded!")
        return None

    X = np.array([[transaction["transaction_amount"], transaction["processing_time"]]])
    prediction = anomaly_model.predict(X)[0]  # -1 = anomaly, 1 = normal

    # Cast numpy.bool_ to Python bool
    return bool(prediction == -1)



