import prisma from "@/app/libs/prismadb";
import { MenuCategoryTotals, MenuItem } from "@/types/menuItem"; // Assuming these types are defined in your project

export default async function fetchAllMenuItems(
  startDate: any,
  endDate: any
): Promise<MenuCategoryTotals & { totalMenuItems: number }> {
  try {
    const defaultStartDate = startDate || new Date();
    const defaultEndDate = endDate || new Date();
    const menuItems = await prisma?.menuItem.findMany({
      include: {
        orderItems: {
          where: {
            createdAt: {
              gte: defaultStartDate,
              lte: defaultEndDate,
            },
          },
        },
      },
    });

    if (!menuItems) {
      throw new Error("Menu items not found");
    }

    const foodItems: MenuItem[] = menuItems.filter(
      (item): item is MenuItem => item.category === "FOOD"
    );
    const drinkItems: MenuItem[] = menuItems.filter(
      (item): item is MenuItem => item.category === "DRINK"
    );

    const foodSubtotal = foodItems.reduce((acc, item) => {
      const subtotal = item.orderItems.reduce((subtotalAcc, orderItem) => {
        return subtotalAcc + (orderItem.subtotal ?? 0);
      }, 0);
      return acc + subtotal;
    }, 0);

    const drinkSubtotal = drinkItems.reduce((acc, item) => {
      const subtotal = item.orderItems.reduce((subtotalAcc, orderItem) => {
        return subtotalAcc + (orderItem.subtotal ?? 0);
      }, 0);
      return acc + subtotal;
    }, 0);

    const drinkItemTotalFixedPrice = drinkItems.reduce((acc, item) => {
      const totalQuantity = item.orderItems.reduce(
        (sum, order) => sum + order.quantity,
        0
      );
      const itemTotalPrice =
        (item.price - (item.buyPrice ?? 0)) * totalQuantity;
      return acc + itemTotalPrice;
    }, 0);

    const totalMenuItems = menuItems.length;

    return {
      foodSubtotal,
      drinkSubtotal,
      drinkItemTotalFixedPrice,
      totalMenuItems,
    };
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw new Error("Menu items couldn't be fetched");
  }
}
