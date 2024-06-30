import prisma from "@/app/libs/prismadb";

export const POST = async (req: Request) => {
  const { id, booking } = await req.json();

  function calculateDurationInMinutes(startTime: any, endTime: any) {
    // Parse the start and end times
    const start: any = new Date(startTime);
    const end: any = new Date(endTime);

    // Calculate the time difference in milliseconds
    const timeDifferenceMs = end - start;

    // Convert milliseconds to minutes
    const minutes = Math.ceil(timeDifferenceMs / (1000 * 60));

    return minutes;
  }

  const durationInMinutes = calculateDurationInMinutes(
    booking.startTime,
    booking.endTime
  );

  function calculateTotalAmount(hourlyRate: any, durationInMinutes: any) {
    // Calculate the cost based on the hourly rate and duration
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    const cost = (hours + minutes / 60) * hourlyRate;

    return cost;
  }
  const totalAmount = calculateTotalAmount(
    booking.amountEarned,
    durationInMinutes
  );

  try {
    const bookingreal = await prisma.bookingHistory.findFirst({
      where: {
        tableId: id,
      },
      orderBy: {
        id: "desc",
      },
    });
    const bokkings = await prisma.bookingHistory.update({
      where: {
        id: bookingreal?.id,
      },
      data: {
        amountEarned: totalAmount,
      },
    });
    return new Response(JSON.stringify(bokkings), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify(`Error occourred. Please try again.${error}`),
      {
        status: 500,
      }
    );
  }
};
export const dynamic = "force-dynamic";
