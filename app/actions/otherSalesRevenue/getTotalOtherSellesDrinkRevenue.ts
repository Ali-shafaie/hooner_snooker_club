import prisma from "@/app/libs/prismadb";

export default async function getTotalOtherSalesDrinkRevenue(
  startDate: any,
  endDate: any
) {
  try {
    const defaultStartDate = startDate;
    const defaultEndDate = endDate;
    const totalRevenue = await prisma.otherSales.findMany({
      where: {
        createdAt: {
          gte: defaultStartDate,
          lte: defaultEndDate,
        },
      },
      include: { menuItem: {} },
    });
    console.log(totalRevenue, "drink total sells");

    // Filter the results based on the category "DRINK"
    const drinkSales: any = totalRevenue.filter(
      (sale) => sale.menuItem.category === "DRINK"
    );

    // Calculate the total revenue for the "DRINK" category
    const totalDrinkRevenue = drinkSales.reduce((acc: any, sale: any) => {
      const { price, menuItem } = sale;
      const revenuePerItem = (menuItem.price - menuItem.buyPrice) * sale.amount;
      return acc + revenuePerItem;
    }, 0);

    return totalDrinkRevenue;
  } catch (error) {
    return new Response(`Order couldn't be fetched ${error}`, { status: 500 });
  }
}
