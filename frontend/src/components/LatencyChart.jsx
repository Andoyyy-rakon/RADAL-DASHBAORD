import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function LatencyChart({ reports }) {
  const chartData = reports.map(packet => ({
    time: new Date(packet.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    }),
    latency: parseFloat(packet.latency_ms.replace("ms", ""))
  }));

  return (
    <div className="p-3 w-80 h-40 bg-white border border-[#E6EAF0] rounded-xl shadow-card">
      <h2 className="font-semibold text-sm text-center mb-1">
        Latency (ms)
      </h2>

      <ResponsiveContainer width="100%" height={110}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis dataKey="time" tick={{ fontSize: 8 }} />

          <YAxis tick={{ fontSize: 8 }} width={30} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="latency"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
