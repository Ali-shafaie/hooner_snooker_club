import prisma from "@/app/libs/prismadb";

export default async function fetchAllMenuItemsList() {
  try {
    const menuItems = await prisma?.menuItem.findMany({});

    return menuItems;
  } catch (error) {
    return new Response("Table couldn't be fetched ", { status: 500 });
  }
}
