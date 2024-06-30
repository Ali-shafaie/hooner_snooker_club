import prisma from "@/app/libs/prismadb";

export const POST = async (req: Request) => {
  const { tableId } = await req.json();
  try {
    const bookings = await prisma.bookingHistory.findFirst({
      where: {
        tableId,
      },
      orderBy: {
        id: "desc",
      },
    });
    return new Response(JSON.stringify(bookings?.customerId), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
