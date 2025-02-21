// frontend/src/components/PaymentSummary.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PaymentSummary() {
  const [paymentResult, setPaymentResult] = useState(null);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const fetchLatestPayment = async () => {
    setLoadingPayment(true);
    try {
      // For a summary, you might fetch the latest payment from your backend.
      // Here, we'll simulate it by creating a test charge.
      const response = await axios.post(
        "http://localhost:8000/api/payment/create_charge",
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
  };

  // Fetch the latest payment summary when component mounts
  React.useEffect(() => {
    fetchLatestPayment();
  }, []);

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
