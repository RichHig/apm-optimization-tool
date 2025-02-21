# ml_scripts/train_success_model.py
import pandas as pd
import pickle
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error

# Load training data
X_train = pd.read_csv("X_train.csv")
y_train = pd.read_csv("y_train.csv").values.ravel()

# Train a RandomForestRegressor
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

# Evaluate on training data
preds = rf.predict(X_train)
mse = mean_squared_error(y_train, preds)
print(f"Training MSE: {mse:.4f}")

# Save the model to the backend/models folder
with open("../backend/models/success_model.pkl", "wb") as f:
    pickle.dump(rf, f)

print("Success model trained and saved as ../backend/models/success_model.pkl")
