import prisma from "@/app/libs/prismadb";
import { ProfitProductType } from "@/types/product";

export default async function getAllProfitProduct(
  startDate?: string,
  endDate?: string
): Promise<ProfitProductType> {
  try {
    const sellProduct = await prisma.sellProduct.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const totalAmountMixedProduct = sellProduct.reduce((acc, product) => {
      return acc + product.price;
    }, 0);

    const totalProductFixedProfit = sellProduct.reduce((acc, product) => {
      return acc + product.productProfit;
    }, 0);

    return {
      totalAmountMixedProduct,
      totalProductFixedProfit,
    };
  } catch (error) {
    console.error("Error fetching sell products:", error);
    throw new Error("Sell products couldn't be fetched");
  }
}
