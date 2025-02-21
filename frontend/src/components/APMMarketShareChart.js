// frontend/src/components/APMMarketShareChart.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function APMMarketShareChart() {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch market share data from backend
  const fetchMarketShare = async () => {
    setLoading(true);
    try {
      // Replace with your actual backend endpoint for market share data
      const response = await axios.get(
        "http://localhost:8000/api/apm/market_share"
      );
      setMarketData(response.data);
    } catch (error) {
      console.error("Error fetching market share data:", error);
    }
    setLoading(false);
  };

  // Fetch the data when component mounts
  useEffect(() => {
    fetchMarketShare();
  }, []);

  return (
    <div className="border p-4 rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-2">APM Market Share</h2>
      {loading ? (
        <p>Loading market share data...</p>
      ) : (
        <PieChart width={400} height={400}>
          <Pie
            data={marketData}
            dataKey="value"
            nameKey="apm"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {marketData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
}

export default APMMarketShareChart;
