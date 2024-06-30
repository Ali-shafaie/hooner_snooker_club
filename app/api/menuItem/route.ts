import prisma from "@/app/libs/prismadb";

export const GET = async (req: Request) => {
  try {
    const menu = await prisma.menuItem.findMany({});
    return new Response(JSON.stringify(menu), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const dynamic = "force-dynamic";
