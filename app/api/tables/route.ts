import prisma from "@/app/libs/prismadb";

export const GET = async (req: Request) => {
  try {
    const tables = await prisma.table.findMany({
      include: { bookingHistory: { include: { customer: true } } },
    });

    return new Response(JSON.stringify(tables), { status: 200 });
  } catch (error) {
    return new Response("Table couldn't be fetched ", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
