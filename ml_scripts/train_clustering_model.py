# ml_scripts/train_clustering_model.py
import pandas as pd
import pickle
from sklearn.cluster import KMeans

# Load synthetic data
df = pd.read_csv("synthetic_transactions.csv")

# Group by merchant to get average transaction_amount and processing_time
merchant_group = df.groupby("merchant_id").agg({
    "transaction_amount": "mean",
    "processing_time": "mean"
}).reset_index()

# Train KMeans to cluster merchants
kmeans = KMeans(n_clusters=3, random_state=42)
merchant_group["cluster"] = kmeans.fit_predict(merchant_group[["transaction_amount", "processing_time"]])

# Save the model to the backend/models folder
with open("../backend/models/clustering_model.pkl", "wb") as f:
    pickle.dump(kmeans, f)

merchant_group.to_csv("merchant_clusters.csv", index=False)
print("Clustering model trained and saved as ../backend/models/clustering_model.pkl")
