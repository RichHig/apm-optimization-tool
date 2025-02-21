import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FraudSummary() {
  const [fraudStatus, setFraudStatus] = useState(null);
  const [loadingFraud, setLoadingFraud] = useState(false);

  // Get the API URL from the environment variable
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchFraudSummary = useCallback(async () => {
    setLoadingFraud(true);
    try {
      // Use the API_URL variable instead of hardcoding localhost
      const response = await axios.post(
        `${API_URL}/api/advanced/detect_fraud`,
        {
          merchant_id: 1,
          transaction_amount: 120,
          processing_time: 2.5,
        }
      );
      setFraudStatus(response.data.is_fraud);
    } catch (error) {
      console.error("Error fetching fraud summary", error);
    }
    setLoadingFraud(false);
  }, [API_URL]);

  useEffect(() => {
    fetchFraudSummary();
  }, [fetchFraudSummary]);

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h2 className="fs-5 fw-bold mb-3">Fraud Detection Summary</h2>
        {loadingFraud && <p>Loading fraud status...</p>}
        {fraudStatus !== null ? (
          <p className="fw-semibold">
            {fraudStatus
              ? "Recent transaction flagged as fraud"
              : "All recent transactions are normal"}
          </p>
        ) : (
          !loadingFraud && <p>No fraud data available.</p>
        )}
        <Link to="/fraud-details" className="btn btn-outline-primary btn-sm">
          View Fraud Details
        </Link>
      </div>
    </div>
  );
}

export default FraudSummary;
