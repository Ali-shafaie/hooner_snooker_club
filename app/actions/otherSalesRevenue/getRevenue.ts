import prisma from "@/app/libs/prismadb";

export default async function fetchAllDailyProduct() {
  // Set to the start of the current day
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  // Set to the end of the current day
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const dailyRevenue = await prisma.sellProduct.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return dailyRevenue;
  } catch (error) {
    return new Response(`Order couldn't be fetched ${error}`, { status: 500 });
  }
}
