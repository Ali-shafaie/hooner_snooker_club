import prisma from "@/app/libs/prismadb";
import { DateTime } from "luxon";

export default async function fetchAllBookings() {
  try {
    // Get the current date
    const currentDate = DateTime.now().toISODate();

    // Filter bookings for today where the endTime is after or equal to the current date
    const bookingHistory = await prisma.bookingHistory.findMany({
      include: { table: true, incomeTransactions: true, customer: true },
    });

    return bookingHistory;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return new Response("Bookings couldn't be fetched ", { status: 500 });
  }
}
