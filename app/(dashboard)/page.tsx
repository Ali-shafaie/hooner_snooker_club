import { Button } from "@/components/ui/button";
import getOneDayExpense from "../actions/expense/fetchOneDayExpense";
import fetchTotalExpense from "../actions/expense/fetchTotalExpense";
import getAllProfitProduct from "../actions/products/getAllProfitProduct";
import { CalendarDateRangePicker } from "./components/DateRangeFilter";
import { Tab, Tabs } from "./components/Tabs";
import AllOverview from "./components/AllOverview";
import Expense from "./components/Expense";
import AllProfit from "./components/AllProfit";
import getTableList from "../actions/tables/getTableListValues";
import fetchAllMenuItems from "../actions/menuItem/getMenuItem";
import getTotalOtherSallesDrinkRevenu from "../actions/otherSalesRevenue/getTotalOtherSellesDrinkRevenue";
import fetchAllBookings from "../actions/bookings/fetchAllBookings";
import getTotalOtherSallesMixedDrinkRevenu from "../actions/otherSalesRevenue/getTotalOtherSellesDrinkMixedRevenue";
import { ExpenseCategoriesType } from "@/types/expense";
import {
  MenuCategoryTotals,
  TotalOtherSellsRevenueType,
} from "@/types/menuItem";
import { ProfitProductType } from "@/types/product";
import getAllTableList from "../actions/tables/gitAllTableList";
import { AllTableListType, TableListResult } from "@/types/tables";
import getTotalOtherSalesRevenue from "../actions/otherSalesRevenue/getTotalOtherSellesRevenue";

export default async function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString();
  };

  const defaultStartDate = getCurrentDate();
  const defaultEndDate = getCurrentDate();

  const startDate = searchParams?.startDate || defaultStartDate;
  const endDate = searchParams?.endDate || defaultEndDate;

  const formatDate = (date: string) => {
    const d = new Date(date);
    return (
      d.getFullYear() +
      "/" +
      monthAbbreviation(d.getMonth()) +
      "/" +
      padZero(d.getDate())
    );
  };

  const desiredStartDateString = formatDate(startDate);
  const desiredEndDateString = formatDate(endDate);

  // Function to get the three-letter abbreviation of the month
  function monthAbbreviation(month: number) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[month];
  }

  // Function to pad a number with a leading zero if it's a single digit
  function padZero(number: number) {
    return number < 10 ? "0" + number : number;
  }

  /** */
  const bookings: any = await fetchAllBookings();
  const profitProduct: ProfitProductType = await getAllProfitProduct(
    startDate,
    endDate
  );

  const expenses: ExpenseCategoriesType = await fetchTotalExpense(
    startDate,
    endDate
  );

  const table: TableListResult = await getTableList(startDate, endDate);

  const allTableList: AllTableListType[] = await getAllTableList();

  const menuItems: MenuCategoryTotals = await fetchAllMenuItems(
    startDate,
    endDate
  );

  const otherSellesMenu: TotalOtherSellsRevenueType =
    await getTotalOtherSalesRevenue(startDate, endDate);

  /** TOTAL EXPENSCE */
  const total_expences: number =
    expenses.ADMINCOST +
    expenses.CAFE +
    expenses.KITCHEN +
    expenses.OTHERS +
    expenses.REPAIR;
  expenses.ADMINCOST;

  /** TOTAL PROFIT FIXED */
  const total_Profit_Fixed: number =
    table.totalAmountEarned +
    profitProduct.totalProductFixedProfit +
    menuItems.drinkItemTotalFixedPrice +
    menuItems.foodSubtotal +
    otherSellesMenu.totalPriceDrinkFixed +
    otherSellesMenu.totalPriceFood;

  /** TOTAL PROFIT MIXED */
  const total_Profit_mixed: number =
    menuItems.foodSubtotal +
    otherSellesMenu.totalPriceFood +
    table.totalAmountEarned +
    profitProduct.totalAmountMixedProduct +
    menuItems.drinkSubtotal +
    otherSellesMenu.totalPriceDrink;

  return (
    <main className={""}>
      <div className="flex flex-wrap justify-between items-center px-6">
        <CalendarDateRangePicker
          className=""
          startDate={desiredStartDateString}
          endDate={desiredEndDateString}
          total_Profit_mixed={total_Profit_mixed}
          total_expences={total_expences}
          otherSellesMenuFood={otherSellesMenu.totalPriceFood}
          expenses={expenses}
          menuItems={menuItems}
          otherSellesDrinkFixedPrice={otherSellesMenu.totalPriceDrinkFixed}
          table={table}
          profitProduct={profitProduct}
          total_Profit_Fixed={total_Profit_Fixed}
        />
      </div>
      <div className="pt-5 px-6">
        <h1 className="text-3xl  font-bold">داشبورد</h1>
        <p className="text-sm text-gray-700 pt-5 px-5 md:px-0">
          این داشبورد بصورت پیش فرض برای یک روز دیزاین گردیده و همچنان میتوانید،
          نظر به تاریخ مشخص فلتر نماید و گزارش خود را تهیه نماید و بعد آن گزارش
          خود را دانلود نماید.
        </p>
      </div>

      <div className=" my-5 px-6">
        <Tabs>
          <Tab label="مرور همه">
            {/* Content for the Profit Product tab */}
            <div>
              <AllOverview
                total_expences={total_expences}
                bookings={bookings}
                menuItemsList={menuItems.totalMenuItems}
                table={table}
                TotalMixedProfit={total_Profit_mixed}
                allTableList={allTableList}
              />
            </div>
          </Tab>

          <Tab label="مصارف">
            {/* Content for the Expenses tab */}
            <div>
              <Expense expense={expenses} />
            </div>
          </Tab>

          <Tab label="فواید">
            {/* Content for the Expenses tab */}
            <div>
              <AllProfit
                totalProductProfit={profitProduct.totalProductFixedProfit}
                totalAmountBookingTable={table.totalAmountEarned}
                sumSubtotalDrink={menuItems.drinkItemTotalFixedPrice}
                sumSubtotalFood={menuItems.foodSubtotal}
                otherSellesMenuDrink={otherSellesMenu.totalPriceDrinkFixed}
                otherSellesMenuFood={otherSellesMenu.totalPriceFood}
                fixedProfit={total_Profit_Fixed}
              />
            </div>
          </Tab>
          {/* Add another tab if needed */}
        </Tabs>
      </div>
    </main>
  );
}
