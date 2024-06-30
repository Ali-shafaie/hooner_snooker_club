import prisma from "@/app/libs/prismadb";

export default async function fetchBookingsIncome() {
  try {
    const bookings = await prisma?.bookingHistory.findMany({});

    return bookings;
  } catch (error) {
    return new Response("Table couldn't be fetched ", { status: 500 });
  }
}
