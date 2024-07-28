"use server";

import prisma from "@/app/libs/prismadb";
import { InputItem, MenuItemType } from "@/types/orders";

export default async function createMenuItems(inputList: InputItem[]) {
  try {
    for (const item of inputList) {
      const findMenuItem = await prisma.menuItem.findFirst({
        where: {
          name: item.name,
        },
      });

      if (findMenuItem) {
        // Converting Date to string
        const menuItem: MenuItemType = {
          id: findMenuItem.id,
          name: findMenuItem.name,
          buyPrice: findMenuItem.buyPrice,
          price: findMenuItem.price,
          countStock: findMenuItem.countStock,
          category: findMenuItem.category,
          createdAt: findMenuItem.createdAt.toISOString(),
          updatedAt: findMenuItem.updatedAt.toISOString(),
        };

        const updatedCountStock =
          menuItem.countStock !== null
            ? menuItem.countStock - parseInt(item.quantity)
            : 0;

        const menuItemUpdated = await prisma.menuItem.update({
          where: {
            id: menuItem.id,
          },
          data: {
            countStock: updatedCountStock,
          },
        });
        return menuItemUpdated;
      } else {
        console.log(`Menu item ${item.name} not found`);
      }
    }
  } catch (error) {
    return { error: `you have an error ${error}` };
  }
}
