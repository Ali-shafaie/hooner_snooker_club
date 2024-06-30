import prisma from "@/app/libs/prismadb";

export const GET = async (req: Request) => {
  try {
    const order = await prisma.order.findMany({});

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    return new Response("Order couldn't be fetched ", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
