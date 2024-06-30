import { Button } from "@/components/ui/button";
import getOneDayExpense from "../actions/expense/fetchOneDayExpense";
import fetchTotalExpense from "../actions/expense/fetchTotalExpense";
import getAllProfitProduct from "../actions/products/getAllProfitProduct";
import { CalendarDateRangePicker } from "./components/DateRangeFilter";
import { Tab, Tabs } from "./components/Tabs";
import AllOverview from "./components/AllOverview";
import Expense from "./components/Expense";
import AllProfit from "./components/AllProfit";
import getTableList from "../actions/tables/getTableList";
import fetchAllMenuItems from "../actions/menuItem/getMenuItem";
import getTotalOtherSallesDrinkRevenu from "../actions/otherSalesRevenue/getTotalOtherSellesDrinkRevenue";
import getTotalOtherSallesFoodRevenu from "../actions/otherSalesRevenue/getTotalOtherSellesFoodRevenue";
import fetchAllBookings from "../actions/bookings/fetchAllBookings";
import getTotalOtherSallesMixedDrinkRevenu from "../actions/otherSalesRevenue/getTotalOtherSellesDrinkMixedRevenue";
import { ExpenseCategoriesType } from "@/types/expense";
import { MenuCategoryTotals } from "@/types/menuItem";
import { ProfitProductType } from "@/types/product";
import { TableListResult } from "@/types/tables";

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

  const menuItems: MenuCategoryTotals = await fetchAllMenuItems(
    startDate,
    endDate
  );

  const otherSellesDrinkFixedPrice: number =
    await getTotalOtherSallesDrinkRevenu(startDate, endDate);

  const otherSellesMixedDrink: number =
    await getTotalOtherSallesMixedDrinkRevenu(startDate, endDate);

  const otherSellesMenuFood: number = await getTotalOtherSallesFoodRevenu(
    startDate,
    endDate
  );

  //TOTAL EXPENSCE
  const total_expences: number =
    expenses.ADMINCOST +
    expenses.CAFE +
    expenses.KITCHEN +
    expenses.OTHERS +
    expenses.REPAIR;
  const total_Profit_Fixed: number =
    table.totalAmountEarned +
    profitProduct.totalProductFixedProfit +
    menuItems.drinkItemTotalFixedPrice +
    menuItems.foodSubtotal +
    otherSellesDrinkFixedPrice +
    otherSellesMenuFood;
  const total_Profit_mixed: number =
    menuItems.foodSubtotal +
    otherSellesMenuFood +
    table.totalAmountEarned +
    profitProduct.totalAmountMixedProduct +
    menuItems.drinkSubtotal +
    otherSellesMixedDrink;

  return (
    <main className={""}>
      <div className="flex flex-wrap justify-between items-center">
        <CalendarDateRangePicker
          className=""
          startDate={desiredStartDateString}
          endDate={desiredEndDateString}
          total_Profit_mixed={total_Profit_mixed}
          total_expences={total_expences}
          otherSellesMenuFood={otherSellesMenuFood}
          expenses={expenses}
          menuItems={menuItems}
          otherSellesDrinkFixedPrice={otherSellesDrinkFixedPrice}
          table={table}
          profitProduct={profitProduct}
          total_Profit_Fixed={total_Profit_Fixed}
        />
      </div>
      <div className="pt-10">
        <h1 className="text-3xl  font-bold">داشبورد</h1>
        <p className="text-sm text-gray-700 pt-5 px-5 md:px-0">
          این داشبورد بصورت پیش فرض برای یک روز دیزاین گردیده و همچنان میتوانید،
          نظر به تاریخ مشخص فلتر نماید و گزارش خود را تهیه نماید و بعد آن گزارش
          خود را دانلود نماید.
        </p>
      </div>

      <div className=" my-5">
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
                totalProductProfit={0}
                totalAmountBookingTable={0}
                sumSubtotalDrink={0}
                sumSubtotalFood={0}
                otherSellesMenuDrink={otherSellesDrinkFixedPrice}
                otherSellesMenuFood={otherSellesMenuFood}
                fixedProfit={0}
              />
            </div>
          </Tab>
          {/* Add another tab if needed */}
        </Tabs>
      </div>
    </main>
  );
}
