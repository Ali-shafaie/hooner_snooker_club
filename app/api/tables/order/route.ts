import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: Request, res: Response) => {
  try {
    // Retrieve orders from the database using Prisma
    const orders = await prisma.order.findMany({
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
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client after the request
  }
};
export const dynamic = "force-dynamic";
