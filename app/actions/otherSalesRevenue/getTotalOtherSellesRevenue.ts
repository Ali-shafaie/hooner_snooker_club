import prisma from "@/app/libs/prismadb";
import { TotalOtherSellsRevenueType } from "@/types/menuItem";

export default async function getTotalOtherSalesFoodRevenue(
  startDate?: string,
  endDate?: string
): Promise<TotalOtherSellsRevenueType> {
  try {
    // Parse dates if provided
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;

    // Adjust endDate to include the entire end day if provided
    const adjustedEndDate = end
      ? new Date(new Date(end).setHours(23, 59, 59, 999))
      : undefined;

    // Fetch sales data with or without date filtering
    const TotalRevenue = await prisma.otherSales.findMany({
      where: {
        ...(start && end
          ? { createdAt: { gte: start, lte: adjustedEndDate } }
          : {}),
      },
      include: { menuItem: true },
    });

    // Filter the results based on the category "FOOD" and "DRINK"
    const foodSales = TotalRevenue.filter(
      (sale) => sale.menuItem.category === "FOOD"
    );
    const drinkSales = TotalRevenue.filter(
      (sale) => sale.menuItem.category === "DRINK"
    );

    // Calculate the total price for the "FOOD" category considering the amount
    const totalPriceFood = foodSales.reduce(
      (sum, sale) => sum + sale.amount * sale.price,
      0
    );

    // Calculate the total price for the "DRINK" category considering the amount
    const totalPriceDrink = drinkSales.reduce(
      (sum, sale) => sum + sale.amount * sale.price,
      0
    );

    // Calculate the total price for the "DRINK" category considering the buy price and amount
    const totalPriceDrinkFixed = drinkSales.reduce(
      (sum: number, sale: any) =>
        sum + (sale.price - sale.menuItem.buyPrice) * sale.amount,
      0
    );

    return { totalPriceFood, totalPriceDrink, totalPriceDrinkFixed };
  } catch (error) {
    console.error("Error fetching other sales:", error);
    throw new Error("Other sales couldn't be fetched");
  }
}
