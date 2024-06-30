import prisma from "@/app/libs/prismadb";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { name, price, buyPrice, category } = body;

  // Assuming countStock is of type Int
  const countStock = body.countStock || 0;

  // Ensure buyPrice is either a valid integer or null
  const validBuyPrice = buyPrice !== "" ? parseInt(buyPrice) : null;

  try {
    const newMenuItem = await prisma.menuItem.create({
      data: {
        name,
        buyPrice: validBuyPrice,
        price,
        category,
        countStock,
      },
    });

    return new Response(JSON.stringify(newMenuItem), { status: 201 });
  } catch (error) {
    console.error("Error creating MenuItem:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
