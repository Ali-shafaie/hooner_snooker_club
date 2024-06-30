import prisma from "@/app/libs/prismadb";

export const POST = async (req: Request) => {
  const { tableId } = await req.json();

  console.log("data comming it", tableId);

  try {
    const table = await prisma.table.delete({
      where: {
        id: tableId,
      },
    });
    return new Response(JSON.stringify(table), { status: 200 });
  } catch (error) {
    return new Response("Table couldn't be deleted ", { status: 500 });
  }
};
