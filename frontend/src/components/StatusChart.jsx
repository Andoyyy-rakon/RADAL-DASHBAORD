    import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

    const COLORS = {
    SAFE: "#4DBA87",
    "ALERT": "#EF646A",
    "AID": "#549EF2"
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
    <div className="p-4 w-full h-[200px] bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] hover:scale-[1.01]">
    <h2 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Status Distribution</h2>
    <ResponsiveContainer width="100%" height="100%" padding={{ bottom: 20 }}>
        <PieChart>
        <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="45%"
            outerRadius={50}  
            innerRadius={30}
            paddingAngle={5}
            label={({ value }) => value}
            labelLine={false}
        >
            {chartData.map((entry, index) => (
            <Cell key={index} fill={COLORS[entry.name]} stroke="transparent" />
            ))}
        </Pie>

        <Tooltip
            contentStyle={{ 
                fontSize: 10, 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                fontWeight: 'bold'
            }}
        />
        <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            iconSize={10}
            iconType="circle"
            wrapperStyle={{ fontSize: 10, paddingBottom: '10px' }}
        />
        </PieChart>
    </ResponsiveContainer>
    </div>

    );
    }
