import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Overview } from "./overview";
import { RecentSales } from "./recent-sales";
import MyPieChart from "./PirChart";
import { AllTableListType, TableListResult } from "@/types/tables";
import { DataChart } from "./ChartData";
interface Props {
  table: TableListResult;
  total_expences: number;
  bookings: any;
  TotalMixedProfit: number;
  menuItemsList: number;
  allTableList: AllTableListType[];
}

const AllOverview = ({
  total_expences,
  bookings,
  menuItemsList,
  table,
  TotalMixedProfit,
  allTableList,
}: Props) => {
  return (
    <div>
      {" "}
      <div className=" mt-5 bg-gray-200 p-5 rounded-[4px]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
          <Card className="bg-white rounded border-b-4 border-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[13px] font-bold ">
                مجموعه میز ها
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
                className="lucide lucide-table"
              >
                <path d="M12 3v18" />
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M3 15h18" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                {table.totalTables > 0 ? (
                  `${table.totalTables} دانه`
                ) : (
                  <div className="text-[11px] font-bold text-gray-500">
                    تا هنوز هیچ میز ثبت نشده است
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white rounded  border-b-4 border-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[13px] font-bold ">
                مجموعه مینو
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
                className="lucide lucide-utensils-crossed"
              >
                <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
                <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
                <path d="m2.1 21.8 6.4-6.3" />
                <path d="m19 5-7 7" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                {menuItemsList > 0 ? (
                  `${menuItemsList} دانه`
                ) : (
                  <div className="text-[11px] font-bold text-gray-500">
                    تا هنوز منیو ثبت نشده است
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white rounded border-b-4 border-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[13px] font-bold ">
                مصارف مجموعی
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
                  {total_expences > 0 ? (
                    <div className="text-xl font-bold">
                      {total_expences} افغانی
                    </div>
                  ) : (
                    <div className="text-[11px] font-bold text-gray-500">
                      شما مصارف ثبت شده ندارید
                    </div>
                  )}{" "}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white rounded border-b-4 border-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[13px] font-bold ">
                مجموع پول دخل
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
              <div className="  text-xl font-bold">
                <div className="">
                  {TotalMixedProfit > 0 ? (
                    <div className="flex justify-between text-xl font-bold">
                      <div>{TotalMixedProfit}</div>
                      <div>
                        {TotalMixedProfit - total_expences > 0 ? (
                          <div className="text-xl font-bold dir"></div>
                        ) : (
                          <div
                            className="text-[11px] flex  font-bold bg-red-300 rounded-[10px] px-2 "
                            dir="ltr"
                          >
                            {"  "}
                            <span className="mx-2">
                              {TotalMixedProfit - total_expences}
                            </span>

                            <span> باقی از دخل </span>
                          </div>
                        )}{" "}
                      </div>
                    </div>
                  ) : (
                    <div className="text-[11px] font-bold text-gray-500">
                      در دخل شما پول موجود نیست
                    </div>
                  )}{" "}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div> </div>
        <div className="hidden md:grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-7  bg-white">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>
                {" "}
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl  leading-none tracking-tight">
                    راپور سالانه
                  </h3>
                  <p className="text-xs text-gray-500">
                    این یک گراف از درامد و مصارف میباشد.
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3 mr-9">
            <CardHeader>
              <CardTitle> لیست آخرین بوکینگ </CardTitle>
              <CardDescription>
                <span className=" text-sm text-gray-500">
                  {/* تعداد کل بوکینگ {bookings.length} بار شده است */}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales booking={bookings} />
            </CardContent>
          </Card>
        </div>
        <DataChart allTableList={allTableList} />
      </div>
    </div>
  );
};

export default AllOverview;
