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
  <div className="p-4 w-full h-[200px] bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] hover:scale-[1.01]">
    <h2 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
      Alerts Per Hour
    </h2>

    <ResponsiveContainer width="100%" height={140}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 20, left: -12, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} vertical={false} />

        <XAxis
          dataKey="time"
          tick={{ fontSize: 9, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          interval={3}
        />

        <YAxis
          tick={{ fontSize: 9, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          width={40}
        />

        <Tooltip 
            contentStyle={{ 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
            }}
        />

        <Line
          type="monotone"
          dataKey="alerts"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

}
