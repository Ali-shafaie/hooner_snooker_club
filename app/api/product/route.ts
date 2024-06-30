import prisma from "@/app/libs/prismadb";

export const GET = async (req: Request) => {
  try {
    const products = await prisma.products.findMany({});

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response("Table couldn't be fetched ", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
