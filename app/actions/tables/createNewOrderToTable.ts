"use server";

import prisma from "@/app/libs/prismadb";
import { OrderTypes } from "@/types/orders";

interface UpdatedMenuItemType {
  id: number;
  name: string;
  buyPrice: number | null;
  price: number;
  countStock: number | null;
  category: string; // Adjust based on your enum type
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
}

export default async function createNewOrderToTable(
  orders: OrderTypes | null,
  inputList: any,
  tableId: number
) {
  try {
    // Create menuItems
    // let createdMenuItem = await createMenuItems(inputList);
    // console.log(createdMenuItem, "created menu item");

    const updatedMenuItems: UpdatedMenuItemType[] = []; // Initialize an empty array to store updated menu items
    for (const item of inputList) {
      const findMenuItem = await prisma.menuItem.findFirst({
        where: {
          name: item.name,
        },
      });
      if (!findMenuItem) {
        console.error(`Menu item with name ${item.name} not found`);
        continue; // Skip to the next item in inputList
      }
      const updatedCountStock =
        findMenuItem.countStock !== null
          ? findMenuItem.countStock - parseInt(item.quantity)
          : 0;

      if (updatedCountStock < 0 || updatedCountStock === 0) {
        return {
          error: "ببخشید! سفارش شما بیشتراز میزان موجود مینو میباشد. ",
        };
      }
      const menuItemUpdated = await prisma.menuItem.update({
        where: {
          id: findMenuItem.id,
        },
        data: {
          countStock: updatedCountStock,
        },
      });

      updatedMenuItems.push({
        ...menuItemUpdated,
        quantity: parseInt(item.quantity),
      }); // Push the updated item to the array with quantity
    }

    const subtotalOrder = updatedMenuItems.reduce(
      (total: number, item: any) => {
        const subtotal = Number(item.price) * Number(item.quantity);
        return total + subtotal;
      },
      0
    );

    const newOrder: any = await prisma.bookingHistory.findFirst({
      where: {
        tableId,
      },
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: "desc", // Orders by createdAt in descending order
      },
    });

    const newTableId = orders?.tableId ?? newOrder?.tableId;
    const newCustomerId = orders?.customer?.id ?? newOrder?.customerId;

    if (!orders) {
      if (newTableId === undefined || newCustomerId === undefined) {
        throw new Error("Table ID or Customer ID is missing.");
      }
      await prisma.order.create({
        data: {
          tableId: newTableId,
          customerId: newCustomerId,
          total: subtotalOrder,
          orderItems: {
            create: updatedMenuItems.map((item: any) => ({
              quantity: Number(item.quantity),
              subtotal: Number(item.quantity) * Number(item.price),
              itemId: item.id,
            })),
          },
        },
      });
    } else {
      const order = await prisma.order.update({
        where: {
          id: orders.id,
        },
        data: {
          total: orders.total + subtotalOrder,
          customerId: orders.customerId,

          orderItems: {
            create: updatedMenuItems.map((item: any) => ({
              quantity: Number(item.quantity),
              subtotal: Number(item.quantity) * Number(item.price),
              itemId: item.id,
            })),
          },
        },
        include: {
          orderItems: true,
        },
      });
    }
    return { success: "شما موفقانه سفارش را ثبت نمودید!" };
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
