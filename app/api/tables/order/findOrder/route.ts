import prisma from "@/app/libs/prismadb";

export const POST = async (req: Request, res: Response) => {
  const { tableId, customerId } = await req.json();
  try {
    // Retrieve orders from the database using Prisma
    const orders = await prisma.order.findFirst({
      where: {
        tableId,
        customerId, // Replace with the tableId you're looking for
      },
      orderBy: {
        id: "desc", // Assuming you have a timestamp field like 'createdAt' to determine the order
      },
      include: {
        orderItems: {
          include: {
            menuItem: true,
          },
        },
        customer: true,
      },
    });

    // Return the formatted orders as a JSON response
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error("Error occurred while fetching orders:", error);
    return new Response(JSON.stringify(error), { status: 200 });
  }
};

export const dynamic = "force-dynamic";
