"use server";

import prisma from "@/app/libs/prismadb";

export default async function updateOrderToTable(quantity: string, order: any) {
  try {
    console.log("quantity ", quantity);
    let updatedQuantity = 0;
    if (quantity > order.quantity) {
      updatedQuantity = parseInt(order.quantity) + 1;
    } else {
      updatedQuantity = parseInt(order.quantity) - 1;
    }
    console.log(updatedQuantity, "updatedQuantity..............");
    console.log(order, "order........");

    const updateOrder = await prisma.orderItem.update({
      where: {
        id: order.id,
      },
      data: {
        quantity: updatedQuantity,
        subtotal: order.menuItem.price * updatedQuantity,
      },
    });
    return { success: "شما موفقانه سفارش را ویرایش نمودید !" };
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
