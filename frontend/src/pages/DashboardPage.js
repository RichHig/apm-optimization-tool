// frontend/src/pages/DashboardPage.js
import React from "react";
import PaymentSummary from "../components/PaymentSummary";
import FeeOptimizationSummary from "../components/FeeOptimizationSummary";
import FraudSummary from "../components/FraudSummary";

function DashboardPage() {
  return (
    <div className="container my-4">
      <h1 className="text-center fw-bold mb-4">Dashboard Overview</h1>
      <div className="row">
        <div className="col-md-4 mb-3">
          <PaymentSummary />
        </div>
        <div className="col-md-4 mb-3">
          <FeeOptimizationSummary />
        </div>
        <div className="col-md-4 mb-3">
          <FraudSummary />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
