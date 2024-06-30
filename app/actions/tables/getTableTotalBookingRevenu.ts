import prisma from "@/app/libs/prismadb";

export default async function getTableTotalBookingRevenue() {
  try {
    const bookingHistory: any = await prisma.bookingHistory.findMany({});

    return bookingHistory;
  } catch (error) {
    return new Response("Booking not fetched", { status: 500 });
  }
}
