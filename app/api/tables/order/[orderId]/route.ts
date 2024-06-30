import prisma from "@/app/libs/prismadb";

export const GET = async (
  req: Request,
  { params }: { params: { id: number } }
) => {
  try {
    // Fetch orders based on the orderId query parameter
    const orders = await prisma.order.findMany({
      where: {
        id: params.id,
      },
      include: {
        orderItems: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 200 });
    console.error("Error fetching orders:", error);
  }
};
