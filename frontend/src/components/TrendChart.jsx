import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  LabelList
} from "recharts";

export default function TrendChart({ reports }) {
  // Group packets by hour (from createdAt)
  const grouped = reports.reduce((acc, item) => {
    const date = new Date(item.createdAt);
    const hour = date.getHours().toString().padStart(2, "0") + ":00";
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {});

  // Full 24-hour chart
  const allHours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0") + ":00"
  );

  const chartData = allHours.map(hour => ({
    time: hour,
    alerts: grouped[hour] || 0
  }));

  return (
  <div className=" p-3 w-80 h-40  bg-white border border-[#E6EAF0] rounded-xl shadow-card">
    <h2 className="font-semibold text-sm text-center mb-1">
      Alerts Per Hour
    </h2>

    <ResponsiveContainer width="100%" height={110}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

        <XAxis
          dataKey="time"
          tick={{ fontSize: 8 }}
          interval={2}   // show every 2 hours para hindi crowded
        />

        <YAxis
          tick={{ fontSize: 8 }}
          width={25}
        />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="alerts"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

}
