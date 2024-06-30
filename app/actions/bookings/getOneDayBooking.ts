import prisma from "@/app/libs/prismadb";
import { DateTime } from "luxon";

export default async function getOneDayBooking() {
  try {
    // Get the current date
    const currentDate = DateTime.now().toISODate();

    // Filter bookings for today where the endTime is after or equal to the current date
    const bookingHistory = await prisma.bookingHistory.findMany({
      where: {
        endTime: {
          gte: new Date(`${currentDate}T00:00:00.000Z`), // Start of the day
          lte: new Date(`${currentDate}T23:59:59.999Z`), // End of the day
        },
      },
      include: { table: true, incomeTransactions: true, customer: true },
    });

    return bookingHistory;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return new Response("Bookings couldn't be fetched ", { status: 500 });
  }
}
