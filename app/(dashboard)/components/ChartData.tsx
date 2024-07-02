"use client";

import React from "react";

import { Card } from "@/components/ui/card";
import ChartAreaVariant from "./AreaChart";
import RadialChart from "./RedialChart";
import MyPieChart from "./PirChart";
import { AllTableListType } from "@/types/tables";

interface Props {
  getRadailChartData?: any[];
  monthlyReprot?: any[];
  allTableList: AllTableListType[];
}

export const DataChart = ({
  getRadailChartData,
  monthlyReprot,
  allTableList,
}: Props) => {
  const data = [
    { date: "2024-06-01", total_profit: 400, total_expens: 20 },
    { date: "2024-06-02", total_profit: 3000, total_expens: 1398 },
    { date: "2024-06-03", total_profit: 2000, total_expens: 9800 },
    { date: "2024-06-04", total_profit: 2780, total_expens: 3908 },
    { date: "2024-06-05", total_profit: 1890, total_expens: 4800 },
    { date: "2024-06-06", total_profit: 2390, total_expens: 3800 },
    { date: "2024-06-07", total_profit: 3490, total_expens: 4300 },
    { name: "2024-06-09", total_profit: 2000, total_expens: 1500 },
    { name: "2024-06-15", total_profit: 2500, total_expens: 1800 },
    { name: "2024-06-17", total_profit: 2000, total_expens: 1200 },
    // Add more data points as needed
  ];

  const radialDataColor = [
    { name: "Category A", value: 2400, fill: "#8822d8" },
    { name: "Category B", value: 4567, fill: "#83e6ed" },
    { name: "Category D", value: 9800, fill: "#f43f5e" },
  ];
  const radialData = getRadailChartData?.map((item, index) => ({
    name: item.name,
    value: item.total,
    fill: radialDataColor[index].fill,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 space-y-3 pt-4 md:gap-5">
      <Card className="col-span-0 md:col-span-4 bg-white pb-4 p-6 ">
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            راپور ماهانه
          </h3>
          <p className="text-xs text-gray-500">
            این یک گراف از درامد و مصارف میباشد.
          </p>
        </div>
        <ChartAreaVariant data={data} />
      </Card>

      <Card className="col-span-3 p-6 rounded-lg  bg-white relative">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex flex-col space-y-2">
            <h3 className="text-2xl  leading-none font-bold">راپور میزها</h3>
            <p className="text-xs text-gray-500">
              این یک گراف حالت باز و بسته میز را نشان میدهد.
            </p>
          </div>
        </div>
        <MyPieChart tableLength={allTableList} />
      </Card>
    </div>
  );
};
{
  /* <Card className="col-span-4">
<CardHeader>
  <CardTitle>Table Status</CardTitle>
</CardHeader>
<CardContent className="pl-2">
<RadialChart data={radialDataColor} />
</CardContent>
</Card> */
}
