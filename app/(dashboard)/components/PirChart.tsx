"use client";

import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

interface MyPieChartProps {
  tableLength: any;
}
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      className="text-center"
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function MyPieChart(props: MyPieChartProps) {
  // Initialize counters
  let freeCount = 0;
  let busyCount = 0;
  let bookedCount = 0;

  // Count the number of each status
  props.tableLength.length > 0 &&
    props.tableLength.forEach((item: any) => {
      switch (item.status) {
        case "FREE":
          freeCount++;
          break;
        case "BUSY":
          busyCount++;
          break;
        case "BOOKED":
          bookedCount++;
          break;
        // Add more cases for other statuses as needed
      }
    });

  // Create the desired array
  const data = [
    { name: "Free Tables", value: freeCount },
    { name: "Busy Tables", value: busyCount },
    { name: "Booked Tables", value: bookedCount },
    // Add more objects for other statuses as needed
  ];
  const COLORS = ["#1fb238", "#f60404", "#ffa50a"];
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx={120}
        cy={120}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        iconSize={10}
        layout="horizontal"
        verticalAlign="bottom"
        align="center"
        formatter={(value, entry) => (
          <span style={{ marginRight: "7px" }}>
            <span style={{ color: entry.color }}>{entry.value}</span>
          </span>
        )}
      />
    </PieChart>
  );
}
