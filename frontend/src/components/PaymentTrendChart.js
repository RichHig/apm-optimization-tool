// frontend/src/components/PaymentTrendChart.js
import React, { useState, useEffect } from "react";
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

  // Function to fetch real-time data from the backend API
  const fetchTrendData = async () => {
    setLoading(true);
    try {
      // Replace with your actual backend endpoint that returns trend data.
      // For demonstration, we'll assume it returns an array of objects with `time` and `amount`.
      const response = await axios.get(
        "http://localhost:8000/api/payment/trend"
      );
      setTrendData(response.data);
    } catch (error) {
      console.error("Error fetching payment trend data:", error);
    }
    setLoading(false);
  };

  // Fetch data once when the component mounts. For real-time updates, you could set up an interval.
  useEffect(() => {
    fetchTrendData();

    // Optional: Refresh data every minute (60000 ms)
    const interval = setInterval(() => {
      fetchTrendData();
    }, 60000);

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border p-4 rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-2">Payment Trends</h2>
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
