import prisma from "@/app/libs/prismadb";
const { DateTime } = require("luxon");

export const POST = async (req: Request) => {
  const { name, sellPrice, buyPrice, countStock } = await req.json();

  const afghanistanTime = DateTime.local().setZone("Asia/Kabul");

  // Add 4 hours and 30 minutes to it
  try {
    const product = await prisma.products.create({
      data: {
        name,
        sellPrice,
        buyPrice,
        countStock,
        createdAt: afghanistanTime,
      },
    });

    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    console.error("Error creating Product:", error);
    return new Response(JSON.stringify(`Internal Server Error ${error}`), {
      status: 500,
    });
  }
};
