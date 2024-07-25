"use server";

import prisma from "@/app/libs/prismadb";

export default async function getSingleOrder(tableId: number) {
  try {
    const bookings = await prisma.bookingHistory.findFirst({
      where: {
        tableId,
      },
      orderBy: {
        id: "desc",
      },
    });

    const orders = await prisma.order.findFirst({
      where: {
        tableId,
        customerId: bookings?.customerId, // Replace with the tableId you're looking for
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

    return orders;
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
