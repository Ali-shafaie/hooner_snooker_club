import prisma from "@/app/libs/prismadb";
import { DateTime } from "luxon";

export default async function getBookingHistoryRevenue() {
  try {
    const todayStart = DateTime.local()
      .setZone("Asia/Kabul")
      .startOf("day")
      .toISO();
    const todayEnd = DateTime.local()
      .setZone("Asia/Kabul")
      .endOf("day")
      .toISO();

    const bookingHistory: any = await prisma.bookingHistory.findMany({
      where: {
        endTime: {
          gte: todayStart as string, // "greater than or equal to" the start of today
          lte: todayEnd as string, // "less than or equal to" the end of today
        },
      },
    });

    return bookingHistory;
  } catch (error) {
    return new Response("Booking not fetched", { status: 500 });
  }
}
