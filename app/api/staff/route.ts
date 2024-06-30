import prisma from "@/app/libs/prismadb";

export const GET = async (req: Request) => {
  try {
    const staff = await prisma.staff.findMany({
      include: { Expenses: true },
    });
    return new Response(JSON.stringify(staff), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const dynamic = "force-dynamic";
