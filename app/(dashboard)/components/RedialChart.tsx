"use client";
import React, { useState, useEffect } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RadialChart = ({ data }: any) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Assuming mobile width is 768px or less
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check the width on initial render

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const style = {
    lineHeight: "24px",
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {payload.map((entry: any, index: number) => (
          <li
            key={`item-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "4px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                backgroundColor: entry.color,
                borderRadius: "50%",
                width: "12px",
                height: "12px",
                marginRight: "8px",
              }}
            ></span>
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="">
      <ResponsiveContainer width="100%" height={320}>
        <RadialBarChart
          cx="50%"
          cy={isMobile ? "50%" : "30%"}
          innerRadius="20%"
          outerRadius="100%"
          barSize={10}
          data={data}
        >
          <RadialBar
            label={{ position: "insideStart", fill: "#fff" }}
            background
            dataKey="value"
          />
          <Legend
            content={renderLegend}
            layout="vertical"
            verticalAlign="bottom"
            align="left"
            wrapperStyle={style}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadialChart;
