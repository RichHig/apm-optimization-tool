import React, { useState, useEffect } from "react";
import axios from "axios";

function FraudDetailsPage() {
  const [fraudData, setFraudData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFraudDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "http://localhost:8000/api/advanced/fraud_details"
      );
      setFraudData(response.data);
    } catch (err) {
      console.error("Error fetching fraud details:", err);
      setError("Failed to load fraud details. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFraudDetails();
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-center fw-bold mb-4">Fraud Details</h1>
      {loading && <p>Loading fraud details...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && fraudData.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Amount (cents)</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {fraudData.map((txn) => (
                <tr key={txn.id}>
                  <td>{txn.id}</td>
                  <td>{txn.amount}</td>
                  <td>{txn.status}</td>
                  <td>{new Date(txn.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p>No fraudulent transactions found.</p>
      )}
    </div>
  );
}

export default FraudDetailsPage;
