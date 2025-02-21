// frontend/src/pages/PaymentPage.js
import React, { useState } from "react";
import axios from "axios";

function PaymentPage() {
  const [paymentAmount, setPaymentAmount] = useState(5000); // in cents
  const [paymentCurrency, setPaymentCurrency] = useState("usd");
  const [paymentDescription, setPaymentDescription] = useState("Test Payment");
  const [paymentResult, setPaymentResult] = useState(null);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [paymentAmountError, setPaymentAmountError] = useState("");

  const handlePaymentAmountChange = (e) => {
    const value = Number(e.target.value);
    if (value <= 0) {
      setPaymentAmountError("Amount must be greater than 0.");
    } else {
      setPaymentAmountError("");
    }
    setPaymentAmount(value);
  };

  const createCharge = async () => {
    if (paymentAmount <= 0) {
      setPaymentAmountError("Amount must be greater than 0.");
      return;
    } else {
      setPaymentAmountError("");
    }
    setLoadingPayment(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/payment/create_charge",
        {
          amount: paymentAmount,
          currency: paymentCurrency,
          description: paymentDescription,
        }
      );
      setPaymentResult(response.data);
    } catch (error) {
      console.error("Error creating charge", error);
    }
    setLoadingPayment(false);
  };

  return (
    <div className="container my-4">
      <h1 className="text-center fw-bold mb-4">Payment Details</h1>
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h2 className="fs-4 fw-bold mb-3">Payment API Integration</h2>
          <div className="mb-3">
            <label className="form-label me-2 fw-semibold">
              Amount (cents):
            </label>
            <input
              type="number"
              value={paymentAmount}
              onChange={handlePaymentAmountChange}
              className="form-control d-inline-block w-auto"
            />
            {paymentAmountError && (
              <p className="text-danger small">{paymentAmountError}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label me-2 fw-semibold">Currency:</label>
            <input
              type="text"
              value={paymentCurrency}
              onChange={(e) => setPaymentCurrency(e.target.value)}
              className="form-control d-inline-block w-auto"
            />
          </div>
          <div className="mb-3">
            <label className="form-label me-2 fw-semibold">Description:</label>
            <input
              type="text"
              value={paymentDescription}
              onChange={(e) => setPaymentDescription(e.target.value)}
              className="form-control d-inline-block w-50"
            />
          </div>
          <button
            onClick={createCharge}
            className="btn btn-warning mb-2 me-2 text-dark fw-semibold"
          >
            Create Charge
          </button>
          {loadingPayment && <p>Processing Payment...</p>}
          {paymentResult && (
            <div className="mt-3 p-3 border rounded bg-light">
              <h4 className="fw-bold mb-3">Payment Result</h4>
              <div className="row mb-2">
                <div className="col-sm-3 text-muted">Charge ID:</div>
                <div className="col-sm-9 fw-semibold">{paymentResult.id}</div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-3 text-muted">Amount:</div>
                <div className="col-sm-9 fw-semibold">
                  {paymentResult.amount} cents
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-3 text-muted">Status:</div>
                <div className="col-sm-9 fw-semibold">
                  {paymentResult.status}
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3 text-muted">Receipt URL:</div>
                <div className="col-sm-9">
                  <a
                    href={paymentResult.receipt_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-decoration-none"
                  >
                    {paymentResult.receipt_url}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
