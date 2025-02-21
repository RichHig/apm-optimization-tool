// frontend/src/pages/Dashboard.js
import React from "react";
import { APMDashboard } from "../components/APMDashboard";

function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <APMDashboard />
    </div>
  );
}

export default Dashboard;
