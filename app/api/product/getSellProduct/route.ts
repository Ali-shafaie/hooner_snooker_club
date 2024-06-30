import prisma from "@/app/libs/prismadb";

export const POST = async (req: Request) => {
  const { id } = await req.json();
  try {
    const products = await prisma.sellProduct.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
      },
    });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response("Table couldn't be fetched ", { status: 500 });
  }
};
