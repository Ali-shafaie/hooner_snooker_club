"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";
import { MenuCategoryTotals } from "@/types/menuItem";
import { ExpenseCategoriesType } from "@/types/expense";
import { table } from "console";
import { TableListResult } from "@/types/tables";
import { ProfitProductType } from "@/types/product";
interface CalendarPropsBill {
  className: string;
  startDate?: String;
  endDate?: String;
  total_Profit_mixed: number;
  total_expences: number;
  expenses: ExpenseCategoriesType;
  menuItems: MenuCategoryTotals;
  otherSellesMenuFood: number;
  otherSellesDrinkFixedPrice: number;
  table: TableListResult;
  profitProduct: ProfitProductType;
  total_Profit_Fixed: number;
}
export function CalendarDateRangePicker({
  className,
  startDate,
  endDate,
  total_Profit_mixed,
  total_expences,
  expenses,
  menuItems,
  otherSellesMenuFood,
  otherSellesDrinkFixedPrice,
  table,
  profitProduct,
  total_Profit_Fixed,
}: CalendarPropsBill) {
  const total_profit: number = total_Profit_mixed - total_expences;

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const printContent = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Report Bill</title>
            <style>
              /* Add your print styles here */
              body {
                font-family: Arial, sans-serif;
                direction: rtl;
                padding-bottem:20px;
              }
              .print-title {
                text-align: center;
                font-size: 28px;
                font-weight: bold;
              }
              .print-title1 {
                text-align: center;
                font-size: 13px;
                font-weight: bold;
                margin-top:5px;
              }
              .print-title2 {
                padding-top:20px;
                font-size: 20px;
                font-weight: bold;
              }
              .print-title3 {
                text-align:center;
                padding:20px;
                font-size: 20px;
                font-weight: bold;
              }
              .print-logo {
                text-align: center;
                -margin-top:20px
              }
              .print-list {
                margin-top: 10px;
              }
              .span-list {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 10px;
                white-space: nowrap;
                border-bottom:1px dashed black;
              }
              .span-list2 {
                display: flex;  
                flex-direction: column;
                gap:5px;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 10px;
                white-space: nowrap;
                border-bottom:1px dashed black;
              }
              .main-span{
                display:flex;
                justify-content: space-between;
               padding:1px 40px;
               margin:1px auto;
               width:auto;
              }
              .span-sign{
                margin-top:30px;
                margin-bottom:20px;
                display:flex;
                justify-content: space-between;
                border-top: 1px dashed #000
              }
              .span-down{
                margin-top:30px;
                margin-bottom:20px;
                display:flex;
                justify-content: space-between;
                border-top: 0.2px dashed #ddd;
              }
              
            </style>
          </head>
          <body >
          <div class="print-logo">
          <img src='/assets/logopng.png' alt="Logo" width="100" height="100"/>
        </div>
        <div style="padding-right:20px; padding-left:20px ">
        <div class="print-title" >گزارش جدید</div>
        <div class="print-title1" >از تاریخ ${startDate} تا ${endDate}</div>

        <div class="print-title2" >لیست مصارف</div>
        <div class="print-list">
        <div class="span-list">
        <span class=""> مصرف آشپزخانه</span>
        <span class="">${expenses.KITCHEN} </span>
        </div>
        <div class="span-list">
        <span class=""> مصرف کانتین</span>
        <span class="" style="font-size:13px" dir="ltr">${expenses.CAFE}</span>
        </div>
        <div class="span-list">
        <span class=""> مصرف تعمیر</span>
        <span class="" style="font-size:13px" dir="ltr">${
          expenses.REPAIR
        }</span>
        </div>
        <div class="span-list">
        <span class=""> مصرف عملیاتی</span>
        <span class="" style="font-size:13px" dir="ltr">${
          expenses.ADMINCOST
        }</span>
        </div>
       
        <div class="span-list">
        <span class=""> مصرف دیگر</span>
        <span class="" style="font-size:13px" dir="ltr">${
          expenses.OTHERS
        }</span>
        </div>
        <div class="print-title2" >لیست عواید</div>
        <div class="span-list">
        <span class=""> عاید آشپزخانه</span>
        <span class="" style="font-size:13px" dir="ltr">${
          menuItems.foodSubtotal + otherSellesMenuFood
        }</span>
        </div>
        <div class="span-list">
        <span class=""> عاید کانتین</span>
        <span class="" style="font-size:13px" dir="ltr">${
          menuItems.drinkItemTotalFixedPrice + otherSellesDrinkFixedPrice
        }</span>
        </div>
        <div class="span-list ">
        <span class=""> عاید میزها</span>
        <span class="" style="font-size:13px" dir="ltr">${
          table.totalAmountEarned
        }</span>
        </div>
        <div class="span-list">
        <span class=""> عاید محصولات</span>
        <span class="" style="font-size:13px" dir="ltr">${
          profitProduct.totalProductFixedProfit
        }</span>
        </div>
      
        <div class="print-title3" >محاسبات کلی</div>
        <div class="main-span">
        <div class="span-list2">
        <span class=""> مصارف</span>
        <span class="" style="font-size:13px;font-weight: bold;" dir="ltr">${total_expences}</span>
        </div>
        <div class="span-list2">
        <span class="">عواید خالص</span>
        <span class="" style="font-size:13px; font-weight: bold;" dir="ltr">${total_Profit_Fixed}</span>
        </div>
        <div class="span-list2">
        <span class="">پول دخل</span>
        <span class="" style="font-size:13px; font-weight: bold;" dir="ltr">${total_profit}</span>
        </div>
        </div>

        <div class="span-sign " style="padding-bottom:10px">
        <span class=""></span>
        <span class="" style="font-size:13px">محل امضاء</span>
        </div> 
        <div class="span-down " style="padding-bottom:10px">
        <span class=""></span>
        <span class="" style="font-size:13px"> </span>
        </div>
        </div>
        </div>
        </body>
        </html>
        `;

      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    }
  };
  const route = useRouter();
  const currentDate = new Date();
  const DateOneDayBefore = new Date(currentDate);
  DateOneDayBefore.setDate(currentDate.getDate() - 1);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: DateOneDayBefore,
    to: currentDate,
  });

  const startFormattedDate = new Date(date?.from ?? new Date());
  const StartformattedDateString = startFormattedDate
    .toISOString()
    .replace(/T/, " ")
    .replace(/\.\d+Z$/, "");
  const endformattedDate = new Date(date?.to ?? new Date());
  const endformattedDateString = endformattedDate
    .toISOString()
    .replace(/T/, " ")
    .replace(/\.\d+Z$/, "");

  const handleChange = () => {
    const formattedStartDate = date?.from?.toISOString();
    const formattedEndDate = date?.to?.toISOString();

    route.push(`?startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
  };

  return (
    <main
      className={cn(
        "flex flex-wrap-reverse  gap-2 justify-center md:justify-between items-center w-full",
        className
      )}
    >
      <div>
        {" "}
        <Button
          className="flex justify-between items-center gap-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handlePrint}
        >
          <span>دانلود گزارش</span>
          <Download />
        </Button>
      </div>
      <div className="flex flex-wrap-reverse items-center gap-2">
        <Button
          className="rounded text-white bg-gray-900 hover:bg-gray-800"
          onClick={() => route.push("/")}
        >
          پاک کردن فلتر
        </Button>
        <Button
          className="bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handleChange}
        >
          فلتر
        </Button>

        <Popover>
          <PopoverTrigger asChild className="w-full ">
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full md:w-[260px] px-6 md:px-0 justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  <div>{format(date?.from, "{{LLL}} dd, y")}</div>
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white" dir="ltr" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </main>
  );
}
