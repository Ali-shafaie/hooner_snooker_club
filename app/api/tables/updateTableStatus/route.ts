import prisma from "@/app/libs/prismadb";

export const PUT = async (req: Request) => {
  const { id } = await req.json();

  try {
    const tables = await prisma.table.update({
      where: {
        id,
      },
      data: {
        status: "FREE",
      },
    });
    return new Response(JSON.stringify(tables), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Error occourred. Please try again."), {
      status: 500,
    });
  }
};
