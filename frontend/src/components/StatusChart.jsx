    import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

    const COLORS = {
    SAFE: "#22c55e",
    "ALERT": "#ef4444",
    "AID": "#60A5FA"
    };

    export default function StatusChart({ reports }) {
    const statusCount = reports.reduce((acc, item) => {
        acc[item.status_str] = (acc[item.status_str] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.keys(statusCount).map(key => ({
        name: key,
        value: statusCount[key]
    }));

    return (
    <div className="bg-white p-3 w-80 h-40 rounded-xl shadow-lg">
    <h2 className="font-semibold text-sm  text-center">Status Distribution</h2>
    <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={40}  
            label={{ fontSize: 10 }} 
        >
            {chartData.map((entry, index) => (
            <Cell key={index} fill={COLORS[entry.name]} />
            ))}
        </Pie>

        <Tooltip
            contentStyle={{ fontSize: 10, padding: "4px 6px" }}
        />
        <Legend
  layout="vertical"
  align="right"
  verticalAlign="middle"
  iconSize={8}
  wrapperStyle={{ fontSize: 10 }}
/>
        </PieChart>
    </ResponsiveContainer>
    </div>

    );
    }
