import prisma from "@/app/libs/prismadb";

export const PUT = async (req: Request) => {
  const { tableId, tableName } = await req.json();

  console.log("cheking name", tableName, tableId);

  try {
    const tables = await prisma.table.update({
      where: {
        id: tableId,
      },
      data: {
        name: tableName,
      },
    });
    return new Response(JSON.stringify(tables), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Error occourred. Please try again."), {
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  const { tableId } = await req.json();

  try {
    const tables = await prisma.table.findUnique({
      where: {
        id: tableId,
      },
    });
    return new Response(JSON.stringify(tables), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Error occourred. Please try again."), {
      status: 500,
    });
  }
};

export const dynamic = "force-dynamic";
