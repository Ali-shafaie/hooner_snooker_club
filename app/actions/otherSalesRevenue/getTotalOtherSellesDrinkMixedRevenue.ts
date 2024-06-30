import prisma from "@/app/libs/prismadb";

export default async function getTotalOtherSallesMixedDrinkRevenu(
  startDate: any,
  endDate: any
) {
  try {
    const defaultStartDate = startDate || new Date();
    const defaultEndDate = endDate || new Date();
    const totalRevenue = await prisma.otherSales.findMany({
      where: {
        createdAt: {
          gte: defaultStartDate,
          lte: defaultEndDate,
        },
      },
      include: { menuItem: {} },
    });

    // Filter the results based on the category "DRINK"
    const drinkSales: any = totalRevenue.filter(
      (sale) => sale.menuItem.category === "DRINK"
    );

    // Calculate the total revenue for the "DRINK" category
    const totalDrinkRevenue = drinkSales.reduce((acc: any, sale: any) => {
      const { menuItem } = sale;
      const revenuePerItem = menuItem.price * sale.amount;
      return acc + revenuePerItem;
    }, 0);

    return totalDrinkRevenue;
  } catch (error) {
    return new Response(`Order couldn't be fetched ${error}`, { status: 500 });
  }
}
