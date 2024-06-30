import prisma from "@/app/libs/prismadb";

export const DELETE = async (req: Request) => {
  const data = await req.json();

  try {
    const sellProduct = await prisma.sellProduct.delete({
      where: { id: data },
    });
    return new Response(JSON.stringify(sellProduct), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(`sorry went wrong ${error}`), {
      status: 500,
    });
  }
};
