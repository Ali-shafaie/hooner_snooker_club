import prisma from "@/app/libs/prismadb";
import { DateTime } from "luxon";

export default async function fetchOrderDrink() {
  try {
    const todayStart = DateTime.local().setZone("Asia/Kabul").startOf("day");
    const todayEnd = todayStart.plus({ days: 1 });

    const orderItems = await prisma.orderItem.findMany({
      where: {
        createdAt: {
          gte: todayStart.toJSDate(),
          lt: todayEnd.toJSDate(),
        },
        menuItem: {
          category: "DRINK",
        },
      },
      include: {
        menuItem: true,
      },
    });

    return orderItems;
  } catch (error) {
    console.error("Order items couldn't be fetched ", error);
    return new Response("Order items couldn't be fetched ", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
