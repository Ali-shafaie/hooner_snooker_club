import prisma from "@/app/libs/prismadb";

export const POST = async (req: Request) => {
  const { name } = await req.json();
  try {
    const table = await prisma.table.create({
      data: {
        name,
        status: "FREE",
      },
    });
    return new Response(JSON.stringify(table), { status: 201 });
  } catch (error) {
    return new Response("Error accured please try again ", { status: 500 });
  }
};
