import prisma from "@/app/libs/prismadb";

export default async function getAllOrderTable() {
  try {
    const orderTable = await prisma.order.findMany({
      include: {
        orderItems: true,
      },
    });
    return orderTable;
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
