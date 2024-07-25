"use server";

import prisma from "@/app/libs/prismadb";

export default async function createNewMenuItem(values: any) {
  const { name, buyPrice, price, category, countStock } = values;
  try {
    const newMenuItem = await prisma.menuItem.create({
      data: {
        name,
        buyPrice: parseInt(buyPrice),
        price,
        category,
        countStock,
      },
    });

    return { success: "شما موفقانه مینو را ثبت نمودید !" };
  } catch (error) {
    return new Response("Table couldn't be fetched ", { status: 500 });
  }
}
