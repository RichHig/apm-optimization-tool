// frontend/src/pages/FeeOptimizationPage.js
import React, { useState } from "react";
import axios from "axios";

function FeeOptimizationPage() {
  const [feeMerchantId, setFeeMerchantId] = useState(1);
  const [feeTransactionAmount, setFeeTransactionAmount] = useState(150);
  const [feeCurrency, setFeeCurrency] = useState("USD");
  const [feeOptimizationResult, setFeeOptimizationResult] = useState(null);
  const [loadingFeeOptimization, setLoadingFeeOptimization] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

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
    <div className="container my-4">
      <h1 className="text-center fw-bold mb-4">Fee Optimization Details</h1>
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h2 className="fs-4 fw-bold mb-3">Fee Optimization Integration</h2>
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
            <div className="mt-3 p-3 border rounded bg-light">
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

export default FeeOptimizationPage;
