import prisma from "@/app/libs/prismadb";

export default async function fetchAllFoodMenuItems() {
  try {
    const menuItems = await prisma?.menuItem.findMany({
      include: { orderItems: true },
    });

    // Filter menu items based on the category 'FOOD'
    const foodMenuItems = menuItems.filter((item) => item.category === "FOOD");

    return foodMenuItems;
  } catch (error) {
    return new Response("Menu items couldn't be fetched ", { status: 500 });
  }
}
