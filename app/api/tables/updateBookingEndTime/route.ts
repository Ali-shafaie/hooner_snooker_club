import prisma from "@/app/libs/prismadb";

export const POST = async (req: Request) => {
  const { id, endTime } = await req.json();

  const date = new Date(endTime);

  date.setUTCHours(date.getUTCHours() + 4, date.getUTCMinutes() + 30);

  // Format the date in the desired format
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+04:30`;

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
        endTime: formattedDate,
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
