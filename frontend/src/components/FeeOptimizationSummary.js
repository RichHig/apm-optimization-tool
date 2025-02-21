// frontend/src/components/FeeOptimizationSummary.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FeeOptimizationSummary() {
  const [feeData, setFeeData] = useState(null);
  const [loadingFee, setLoadingFee] = useState(false);

  const fetchFeeSummary = async () => {
    setLoadingFee(true);
    try {
      // Fetch fee optimization summary data from backend.
      // For this example, we assume the backend returns fee results and a recommended APM.
      const response = await axios.post(
        "http://localhost:8000/api/advanced/fee_optimization",
        {
          merchant_id: 1,
          transaction_amount: 150,
          currency: "USD",
        }
      );
      setFeeData(response.data);
    } catch (error) {
      console.error("Error fetching fee summary", error);
    }
    setLoadingFee(false);
  };

  React.useEffect(() => {
    fetchFeeSummary();
  }, []);

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h2 className="fs-5 fw-bold mb-3">Fee Optimization Summary</h2>
        {loadingFee && <p>Loading fee data...</p>}
        {feeData ? (
          <div className="mb-3">
            <div className="row mb-1">
              <div className="col-4 text-muted">Recommended APM:</div>
              <div className="col-8 fw-semibold">{feeData.recommended_apm}</div>
            </div>
            {/* Display first fee result as a snippet */}
            {Object.entries(feeData.fee_results)
              .slice(0, 1)
              .map(([apm, fee]) => (
                <div className="row mb-1" key={apm}>
                  <div className="col-4 text-muted">{apm} Fee:</div>
                  <div className="col-8 fw-semibold">{fee.toFixed(2)}</div>
                </div>
              ))}
          </div>
        ) : (
          !loadingFee && <p>No fee data available.</p>
        )}
        <Link to="/fee-optimization" className="btn btn-outline-primary btn-sm">
          View Detailed Fee Optimization
        </Link>
      </div>
    </div>
  );
}

export default FeeOptimizationSummary;
