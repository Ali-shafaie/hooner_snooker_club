import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AllProfitProps {
  totalAmountEarned: number;
  subtotalSumFood: any;
  totalAmountKitchenExpense: number;
  total_priceDrinkCategoryTable: any;
  sumOfProductّFixedProfits: any;
  profitProducts: number;
  totalPriceFoodExtraSell: number;
  totalPriceDrinkExtraSell: any;
  total_profit: number;
}
const AllProfit = ({
  totalProductProfit,
  totalAmountBookingTable,
  sumSubtotalDrink,
  sumSubtotalFood,
  otherSellesMenuDrink,
  otherSellesMenuFood,
  fixedProfit,
}: any) => {
  return (
    <div className="md:h-screen mt-5 bg-gray-200 p-5">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4  mt-10">
        <Card className="bg-white rounded">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[13px] font-bold ">
              عواید مجموعی میز
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1fb238"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-circle-dollar-sign"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
              <path d="M12 18V6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              <div className="text-xl font-bold">
                <div>
                  {totalAmountBookingTable > 0 ? (
                    <div className="text-xl font-bold">
                      {totalAmountBookingTable} افغانی
                    </div>
                  ) : (
                    <div className="text-[11px] font-bold text-gray-500">
                      میز شما عواید ندارد
                    </div>
                  )}{" "}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[13px] font-bold ">
              عواید مجموعی آشپزخانه
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1fb238"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-circle-dollar-sign"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
              <path d="M12 18V6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div>
              {sumSubtotalFood > 0 ? (
                <div className="text-xl font-bold">
                  {" "}
                  {sumSubtotalFood} افغانی
                </div>
              ) : (
                <div className="text-[11px] font-bold text-gray-500">
                  آشپز خانه شما عواید ندارد
                </div>
              )}{" "}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[13px] font-bold ">
              {" "}
              عواید مجموعی کانتین
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1fb238"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-circle-dollar-sign"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
              <path d="M12 18V6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              <div>
                {sumSubtotalDrink > 0 ? (
                  <div className="text-xl font-bold">
                    {sumSubtotalDrink} افغانی
                  </div>
                ) : (
                  <div className="text-[11px] font-bold text-gray-500">
                    کانتین شما عواید ندارد
                  </div>
                )}{" "}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[13px] font-bold ">
              {" "}
              عواید فروش محصولات
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1fb238"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-circle-dollar-sign"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
              <path d="M12 18V6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              <div>
                {totalProductProfit > 0 ? (
                  <div className="text-xl font-bold">
                    {totalProductProfit} افغانی
                  </div>
                ) : (
                  <div className="text-[11px] font-bold text-gray-500">
                    محصولات شما عواید ندارد
                  </div>
                )}{" "}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[13px] font-bold ">
              {" "}
              عواید فروش متفرقه آشپزخانه
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1fb238"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-circle-dollar-sign"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
              <path d="M12 18V6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              <div>
                {otherSellesMenuFood > 0 ? (
                  <div className="text-xl font-bold">
                    {otherSellesMenuFood} افغانی
                  </div>
                ) : (
                  <div className="text-[11px] font-bold text-gray-500">
                    شما عواید متفرقه آشپزخانه ندارید.
                  </div>
                )}{" "}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[13px] font-bold ">
              {" "}
              عواید فروش متفرقه کانتین
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1fb238"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-circle-dollar-sign"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
              <path d="M12 18V6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              <div>
                {otherSellesMenuDrink > 0 ? (
                  <div className="text-xl font-bold">
                    {otherSellesMenuDrink} افغانی
                  </div>
                ) : (
                  <div className="text-[11px] font-bold text-gray-500">
                    شما عواید متفرقه کانتین ندارید.
                  </div>
                )}{" "}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[13px] font-bold ">
              {" "}
              مجموع عواید خالص
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1fb238"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-circle-dollar-sign"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
              <path d="M12 18V6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              <div>
                {fixedProfit > 0 ? (
                  <div className="text-xl font-bold">{fixedProfit} افغانی</div>
                ) : (
                  <div className="text-[11px] font-bold text-gray-500">
                    عواید مجموعی شما موجود نیست
                  </div>
                )}{" "}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AllProfit;
