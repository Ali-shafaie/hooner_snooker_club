import prisma from "@/app/libs/prismadb";

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const body = await req.json();
  const departmentId = parseInt(params.id, 10);

  console.log("ceck it", body);

  try {
    const updateMenuItem = await prisma.products.update({
      where: { id: departmentId },
      data: {
        name: body.name,
        sellPrice: body.sellPrice,
        countStock: body.countStock,
      },
    });
    return new Response(JSON.stringify(updateMenuItem), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "the menu item api getting an error" }),
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const departmentId = parseInt(params.id, 10);

  try {
    await prisma.products.delete({
      where: { id: departmentId },
    });

    return new Response(JSON.stringify("product Successfuly deleted"), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
