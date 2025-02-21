import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PaymentSummary() {
  const [paymentResult, setPaymentResult] = useState(null);
  const [loadingPayment, setLoadingPayment] = useState(false);

  // Get the API URL from the environment variable
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchLatestPayment = useCallback(async () => {
    setLoadingPayment(true);
    try {
      // Use the API_URL variable to build the request URL instead of hardcoding localhost
      const response = await axios.post(
        `${API_URL}/api/payment/create_charge`,
        {
          amount: 5000,
          currency: "usd",
          description: "Latest Test Payment",
        }
      );
      setPaymentResult(response.data);
    } catch (error) {
      console.error("Error fetching payment summary", error);
    }
    setLoadingPayment(false);
  }, [API_URL]);

  // Fetch the latest payment summary when the component mounts
  useEffect(() => {
    fetchLatestPayment();
  }, [fetchLatestPayment]);

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h2 className="fs-5 fw-bold mb-3">Payment Summary</h2>
        {loadingPayment && <p>Loading latest payment...</p>}
        {paymentResult ? (
          <div className="mb-3">
            <p className="mb-1">
              <strong>Charge ID:</strong> {paymentResult.id}
            </p>
            <p className="mb-1">
              <strong>Amount:</strong> {paymentResult.amount} cents
            </p>
            <p className="mb-1">
              <strong>Status:</strong> {paymentResult.status}
            </p>
          </div>
        ) : (
          !loadingPayment && <p>No recent payment found.</p>
        )}
        <Link to="/payment" className="btn btn-outline-primary btn-sm">
          View Payment Details
        </Link>
      </div>
    </div>
  );
}

export default PaymentSummary;
