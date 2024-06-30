import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const tabContentDate = [
  { label: "Today", value: "روزانه" },
  { label: "Weekly", value: "هفته وار" },
  { label: "Monthly", value: "ماهانه" },
  { label: "Yearly", value: "سالانه" },
];

interface AllProfitProps {
  totalBookingRevenueTable: number;
  TotalOrderKantinrevenue: any;
  totalAmountKitchenExpense: number;
  total_priceDrinkCategoryTable: any;
  sumOfProductّFixedProfits: any;
  profitProducts: number;
  totalPriceFoodExtraSell: number;
  totalPriceDrinkExtraSell: any;
  total_profit: number;
  TotalOrderKitchenrevenue: any;
}
const TotalProfit = ({
  totalBookingRevenueTable,
  TotalOrderKantinrevenue,
  totalPriceDrinkExtraSell,
  totalPriceFoodExtraSell,
  total_profit,
  TotalOrderKitchenrevenue,
  totalAmountKitchenExpense,
  profitProducts,
}: AllProfitProps) => {
  const AllProfit =
    totalBookingRevenueTable +
    (TotalOrderKitchenrevenue +
      totalPriceFoodExtraSell -
      totalAmountKitchenExpense) +
    (TotalOrderKantinrevenue + totalPriceDrinkExtraSell) +
    profitProducts;

  return (
    <div className="md:h-screen mt-5 bg-gray-200 p-5">
      <div className="bg-white flex items-center h-11 ">
        <div className="flex mx-2">
          <button
            className={`${"bg-green-600 text-white"} px-4 py-1 text-[13px] h-8`}
          >
            مجموع درامد
          </button>
        </div>
      </div>

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
              className="lucide lucide-users"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              <div className="text-xl font-bold">
                <div>
                  {totalBookingRevenueTable > 0 ? (
                    <div className="text-xl font-bold">
                      {totalBookingRevenueTable} افغانی
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
              {TotalOrderKitchenrevenue +
                totalPriceFoodExtraSell -
                totalAmountKitchenExpense >
              0 ? (
                <div className="text-xl font-bold">
                  {" "}
                  {TotalOrderKitchenrevenue +
                    totalPriceFoodExtraSell -
                    totalAmountKitchenExpense}{" "}
                  افغانی
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
                {TotalOrderKantinrevenue + totalPriceDrinkExtraSell > 0 ? (
                  <div className="text-xl font-bold">
                    {TotalOrderKantinrevenue + totalPriceDrinkExtraSell} افغانی
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
                {profitProducts > 0 ? (
                  <div className="text-xl font-bold">
                    {profitProducts} افغانی
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
                {totalPriceFoodExtraSell > 0 ? (
                  <div className="text-xl font-bold">
                    {totalPriceFoodExtraSell} افغانی
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
                {totalPriceDrinkExtraSell > 0 ? (
                  <div className="text-xl font-bold">
                    {totalPriceDrinkExtraSell} افغانی
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
                {AllProfit > 0 ? (
                  <div className="text-xl font-bold">{AllProfit} افغانی</div>
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

export default TotalProfit;
