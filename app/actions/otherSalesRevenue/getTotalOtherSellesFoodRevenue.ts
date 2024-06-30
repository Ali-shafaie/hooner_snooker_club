import prisma from "@/app/libs/prismadb";

export default async function getTotalOtherSallesFoodRevenu(
  startDate: any,
  endDate: any
) {
  try {
    const defaultStartDate = startDate || new Date();
    const defaultEndDate = endDate || new Date();
    const TotalRevenue = await prisma.otherSales.findMany({
      where: {
        createdAt: {
          gte: defaultStartDate,
          lte: defaultEndDate,
        },
      },
      include: { menuItem: {} },
    });

    // Filter the results based on the category "DRINK"
    const foodSales: any = TotalRevenue.filter(
      (sale) => sale.menuItem.category === "FOOD"
    );

    // Calculate the total price for the "DRINK" category
    const totalPrice = foodSales.reduce(
      (sum: any, sale: any) => sum + sale.price,
      0
    );

    return totalPrice;
  } catch (error) {
    return new Response(`Order couldn't be fetched ${error}`, { status: 500 });
  }
}
