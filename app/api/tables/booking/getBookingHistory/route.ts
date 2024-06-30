import prisma from "@/app/libs/prismadb";

export const GET = async (req: Request) => {
  try {
    const booking = await prisma.bookingHistory.findMany({});
    return new Response(JSON.stringify(booking), { status: 200 });
  } catch (error) {
    return new Response("Table couldn't be fetched ", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
