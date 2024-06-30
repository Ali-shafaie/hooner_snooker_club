import prisma from "@/app/libs/prismadb";

export const GET = async (req: Request) => {
  try {
    const expenses = await prisma.expense.findMany({
      include: {
        staffs: {
          select: {
            staff_id: true,
            name: true,
            job: true,
            phone: true,
            salary: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(expenses), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const dynamic = "force-dynamic";
