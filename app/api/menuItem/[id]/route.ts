import prisma from "@/app/libs/prismadb";

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const body = await req.json();

  const departmentId = parseInt(params.id, 10);
  try {
    const updateMenuItem = await prisma.menuItem.update({
      where: { id: departmentId },
      data: {
        name: body.name,
        price: body.price,
        ...(body.buyPrice !== undefined && { buyPrice: body.buyPrice }),
        category: body.category,
        countStock: body.countStock,
      },
    });

    return new Response(JSON.stringify(updateMenuItem), { status: 200 });
  } catch (error) {
    console.log(error);

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
    await prisma.menuItem.delete({
      where: { id: departmentId },
    });

    return new Response(JSON.stringify("Menu Item Successfuly deleted"), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
