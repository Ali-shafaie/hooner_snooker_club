// Import necessary modules
import prisma from "@/app/libs/prismadb";

export const POST = async (req: Request) => {
  const { tableId, customerId, startTime, endTime } = await req.json();

  try {
    const booking = await prisma.bookingHistory.deleteMany({
      where: {
        tableId,
        customerId,
        startTime,
        endTime,
      },
    });

    // Respond with the created booking
    return new Response(JSON.stringify(booking), { status: 201 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
