import prisma from "@/app/libs/prismadb";

export const POST = async (req: Request) => {
  const { data: name } = await req.json();

  try {
    const item = await prisma.menuItem.findFirst({
      where: {
        name: name,
      },
    });
    return new Response(JSON.stringify(item), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
