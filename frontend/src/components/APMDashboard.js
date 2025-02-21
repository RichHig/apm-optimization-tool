import React, { useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export function APMDashboard() {
  // States for Recommendations, Success Prediction, Fraud Detection
  const [data, setData] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [predictedSuccess, setPredictedSuccess] = useState(null);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [isFraud, setIsFraud] = useState(null);
  const [loadingFraud, setLoadingFraud] = useState(false);

  // States for Payment API integration
  const [paymentAmount, setPaymentAmount] = useState(5000); // in cents
  const [paymentCurrency, setPaymentCurrency] = useState("usd");
  const [paymentDescription, setPaymentDescription] = useState("Test Payment");
  const [paymentResult, setPaymentResult] = useState(null);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [paymentAmountError, setPaymentAmountError] = useState("");

  // States for Fee Optimization integration
  const [feeMerchantId, setFeeMerchantId] = useState(1);
  const [feeTransactionAmount, setFeeTransactionAmount] = useState(150);
  const [feeCurrency, setFeeCurrency] = useState("USD");
  const [feeOptimizationResult, setFeeOptimizationResult] = useState(null);
  const [loadingFeeOptimization, setLoadingFeeOptimization] = useState(false);

  // Get the API URL from environment variables
  const API_URL = process.env.REACT_APP_API_URL;

  // Validate and update Payment Amount
  const handlePaymentAmountChange = (e) => {
    const value = Number(e.target.value);
    if (value <= 0) {
      setPaymentAmountError("Amount must be greater than 0.");
    } else {
      setPaymentAmountError("");
    }
    setPaymentAmount(value);
  };

  // Fetch Recommendations from backend
  const fetchRecommendations = async () => {
    setLoadingRecommendations(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/transactions/recommend`,
        {
          merchant_id: 1,
          location: "US",
          transaction_history: [
            {
              amount: 100,
              status: "success",
              timestamp: "2025-01-01T12:00:00",
            },
            { amount: 50, status: "failed", timestamp: "2025-01-02T12:00:00" },
          ],
        }
      );
      // Assumes response is an array of [apm, score] pairs
      const chartData = response.data.recommendations.map(([apm, score]) => ({
        name: apm,
        score,
      }));
      setData(chartData);
    } catch (error) {
      console.error("Error fetching recommendations", error);
    }
    setLoadingRecommendations(false);
  };

  // Predict Success Rate from backend
  const predictSuccessRate = async () => {
    setLoadingPrediction(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/advanced/predict_success`,
        {
          merchant_id: 1,
          transaction_amount: 120,
          processing_time: 2.5,
        }
      );
      setPredictedSuccess(response.data.predicted_success_rate);
    } catch (error) {
      console.error("Error predicting success rate", error);
    }
    setLoadingPrediction(false);
  };

  // Detect Fraud from backend
  const detectFraud = async () => {
    setLoadingFraud(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/advanced/detect_fraud`,
        {
          merchant_id: 1,
          transaction_amount: 120,
          processing_time: 2.5,
        }
      );
      setIsFraud(response.data.is_fraud);
    } catch (error) {
      console.error("Error detecting fraud", error);
    }
    setLoadingFraud(false);
  };

  // Create Payment Charge via Payment API
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
        `${API_URL}/api/payment/create_charge`,
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

  // Optimize Fee via Fee Optimization endpoint
  const optimizeFee = async () => {
    setLoadingFeeOptimization(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/advanced/fee_optimization`,
        {
          merchant_id: feeMerchantId,
          transaction_amount: feeTransactionAmount,
          currency: feeCurrency,
        }
      );
      setFeeOptimizationResult(response.data);
    } catch (error) {
      console.error("Error optimizing fee", error);
    }
    setLoadingFeeOptimization(false);
  };

  return (
    <div className="p-3">
      <h1 className="fs-2 fw-bold text-center mb-4">
        APM Optimization Dashboard
      </h1>

      {/* Section: APM Recommendations */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h2 className="fs-4 fw-bold mb-3">APM Recommendations</h2>
          <button
            onClick={fetchRecommendations}
            className="btn btn-success mb-2 me-2"
          >
            Get Recommendations
          </button>
          {loadingRecommendations && <p>Loading recommendations...</p>}
          {data.length > 0 && (
            <BarChart width={500} height={300} data={data}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
          )}
        </div>
      </div>

      {/* Section: Success Prediction */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h2 className="fs-4 fw-bold mb-3">Success Prediction</h2>
          <button
            onClick={predictSuccessRate}
            className="btn btn-primary mb-2 me-2"
          >
            Predict Success Rate
          </button>
          {loadingPrediction && <p>Loading prediction...</p>}
          {predictedSuccess !== null && (
            <p>Predicted Success Rate: {predictedSuccess.toFixed(3)}</p>
          )}
        </div>
      </div>

      {/* Section: Fraud Detection */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h2 className="fs-4 fw-bold mb-3">Fraud Detection</h2>
          <button onClick={detectFraud} className="btn btn-danger mb-2 me-2">
            Detect Fraud
          </button>
          {loadingFraud && <p>Loading fraud detection...</p>}
          {isFraud !== null && (
            <p>
              Fraud Detection:{" "}
              {isFraud
                ? "Transaction flagged as fraud"
                : "Transaction is normal"}
            </p>
          )}
        </div>
      </div>

      {/* Section: Payment API Integration */}
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
            <div className="mt-4 p-3 border rounded bg-light">
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

      {/* Section: Fee Optimization Integration */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h2 className="fs-4 fw-bold mb-3">Fee Optimization</h2>
          <div className="mb-3">
            <label className="form-label me-2 fw-semibold">Merchant ID:</label>
            <input
              type="number"
              value={feeMerchantId}
              onChange={(e) => setFeeMerchantId(Number(e.target.value))}
              className="form-control d-inline-block w-auto"
            />
          </div>
          <div className="mb-3">
            <label className="form-label me-2 fw-semibold">
              Transaction Amount:
            </label>
            <input
              type="number"
              value={feeTransactionAmount}
              onChange={(e) => setFeeTransactionAmount(Number(e.target.value))}
              className="form-control d-inline-block w-auto"
            />
          </div>
          <div className="mb-3">
            <label className="form-label me-2 fw-semibold">Currency:</label>
            <input
              type="text"
              value={feeCurrency}
              onChange={(e) => setFeeCurrency(e.target.value)}
              className="form-control d-inline-block w-auto"
            />
          </div>
          <button
            onClick={optimizeFee}
            className="btn btn-info mb-2 me-2 text-dark fw-semibold"
          >
            Optimize Fee
          </button>
          {loadingFeeOptimization && <p>Optimizing fee...</p>}
          {feeOptimizationResult && (
            <div className="mt-4 p-3 border rounded bg-light">
              <h4 className="fw-bold mb-3">Fee Results</h4>
              {Object.entries(feeOptimizationResult.fee_results).map(
                ([apm, fee]) => (
                  <div className="row mb-2" key={apm}>
                    <div className="col-sm-3 text-muted">{apm}</div>
                    <div className="col-sm-9 fw-semibold">{fee.toFixed(2)}</div>
                  </div>
                )
              )}
              <div className="row mt-3">
                <div className="col-sm-3 text-muted">Recommended APM:</div>
                <div className="col-sm-9 fw-semibold">
                  {feeOptimizationResult.recommended_apm}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default APMDashboard;
