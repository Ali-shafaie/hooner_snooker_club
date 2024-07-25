import prisma from "@/app/libs/prismadb";
import { MenuItem } from "@/types/menuItem";

export default async function getAllMenuItems(): Promise<MenuItem[]> {
  try {
    const menuItems = await prisma.menuItem.findMany({});
    return menuItems;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw new Error("Menu items couldn't be fetched");
  }
}
