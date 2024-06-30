import prisma from "@/app/libs/prismadb";
import { DateTime } from "luxon";

export default async function fetchAllOrders() {
  try {
    const startTimeLuxon: any = DateTime.fromJSDate(new Date(), {
      zone: "Asia/Kabul",
    });

    const year = startTimeLuxon.c.year;
    const month = startTimeLuxon.c.month;
    const day = startTimeLuxon.c.day;
    const date = `${year}-${month}-${day}`;
    const orders = await prisma?.sellProduct.findMany({
      where: {
        createdAt: {
          gte: new Date(date),
        },
      },
    });

    return orders;
  } catch (error) {
    return new Response(`Table couldn't be fetched ${error} `, { status: 500 });
  }
}
