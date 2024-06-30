import prisma from "@/app/libs/prismadb";

export default async function fetchTotalProductProfit() {
  try {
    const TotalRevenue = await prisma.sellProduct.findMany({});
    return TotalRevenue;
  } catch (error) {
    return new Response(`Order couldn't be fetched ${error}`, { status: 500 });
  }
}
