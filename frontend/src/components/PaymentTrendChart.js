// frontend/src/components/PaymentTrendChart.js
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

function PaymentTrendChart() {
  // State to hold fetched data
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get the API URL from environment variables
  const API_URL = process.env.REACT_APP_API_URL;

  // Function to fetch real-time data from the backend API
  const fetchTrendData = useCallback(async () => {
    setLoading(true);
    try {
      // Use the environment variable to construct the API endpoint URL
      const response = await axios.get(`${API_URL}/api/payment/trend`);
      setTrendData(response.data);
    } catch (error) {
      console.error("Error fetching payment trend data:", error);
    }
    setLoading(false);
  }, [API_URL]);

  // Fetch data when component mounts and set up a refresh interval every minute
  useEffect(() => {
    fetchTrendData();
    const interval = setInterval(() => {
      fetchTrendData();
    }, 60000);

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, [fetchTrendData]);

  return (
    <div className="border p-4 rounded shadow mt-4">
      <h2 className="fs-4 fw-bold mb-2">Payment Trends</h2>
      {loading ? (
        <p>Loading trend data...</p>
      ) : (
        <LineChart
          width={500}
          height={300}
          data={trendData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      )}
    </div>
  );
}

export default PaymentTrendChart;
