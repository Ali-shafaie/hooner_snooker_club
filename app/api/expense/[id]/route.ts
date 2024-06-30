import prisma from "@/app/libs/prismadb";

export const PATCH = async (
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  const body = await req.json();
  const { name, amount, description, category } = body;

  try {
    const updateExpense = await prisma.expense.update({
      where: { id: parseInt(id) },
      data: {
        name,
        amount,
        description,
        category,
      },
    });

    return new Response(JSON.stringify(updateExpense), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const expenseId = parseInt(id);
    await prisma.expense.delete({
      where: { id: expenseId },
    });
    return new Response(JSON.stringify("Your expense is deleted"), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "your expense is not deleted" })
    );
  }
};
