import prisma from "@/app/libs/prismadb";
import { ExpenseCategoriesType } from "@/types/expense";

// Define a type guard function
function isValidCategory(
  category: any
): category is keyof ExpenseCategoriesType {
  return ["ADMINCOST", "KITCHEN", "CAFE", "REPAIR", "OTHERS"].includes(
    category
  );
}

export default async function fetchTotalExpense(
  startDate: any,
  endDate: any
): Promise<ExpenseCategoriesType & { totalMenuItems: number }> {
  const defaultStartDate = startDate || new Date();
  const defaultEndDate = endDate || new Date();

  try {
    const expenses = await prisma.expense.findMany({
      where: {
        createdAt: {
          gte: defaultStartDate,
          lte: defaultEndDate,
        },
      },
    });

    // Initialize category totals
    const categoryTotals: ExpenseCategoriesType = {
      ADMINCOST: 0,
      KITCHEN: 0,
      CAFE: 0,
      REPAIR: 0,
      OTHERS: 0,
    };

    // Aggregate amounts by category
    let totalMenuItems = 0;
    expenses.forEach((expense) => {
      const category = expense.category;
      if (isValidCategory(category)) {
        categoryTotals[category] += expense.amount;
      } else {
        categoryTotals.OTHERS += expense.amount; // Default to 'OTHERS' category if category is invalid
      }
      totalMenuItems++;
    });

    return { ...categoryTotals, totalMenuItems };
  } catch (error) {
    console.error(error);
    throw new Error("Table couldn't be fetched");
  }
}
