"use client";

import {
  Tooltip,
  XAxis,
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import React from "react";

const ChartAreaVariant = ({ data }: any) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <defs>
          <linearGradient id="total_profit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="2%" stopColor="#3d82f6" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#3d82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="total_expens" x1="0" y1="0" x2="0" y2="1">
            <stop offset="2%" stopColor="#f43f5e" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#f43f5e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="name"
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Area
          type="monotone"
          dataKey="total_profit"
          stackId="1"
          strokeWidth={2}
          stroke="#3d82f6"
          fill="url(#total_profit)"
          className="drop-shadow-sm"
        />
        <Area
          type="monotone"
          dataKey="total_expens"
          stackId="2"
          strokeWidth={2}
          stroke="#f43f5e"
          fill="url(#total_expens)"
          className="drop-shadow-sm"
        />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ChartAreaVariant;
