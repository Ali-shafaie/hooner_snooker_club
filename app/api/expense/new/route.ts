import prisma from "@/app/libs/prismadb";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, amount, expireDate, staff, description, category } = body;
    const { DateTime } = require("luxon");

    const afghanistanTime = DateTime.local().setZone("Asia/Kabul");

    // Add 4 hours and 30 minutes to it

    let expense;

    if (staff) {
      // Convert staff to an integer
      const staffId = parseInt(staff, 10);

      // If staff is provided, create the expense and connect it to the staff
      expense = await prisma.expense.create({
        data: {
          name,
          amount,
          expireDate: expireDate ? parseInt(expireDate, 10) : null,
          description,
          category,
          expenseDate: afghanistanTime,
          createdAt: afghanistanTime,
          staffs: {
            connect: { staff_id: staffId },
          },
        },
        include: {
          staffs: true,
        },
      });
    } else {
      // If staff is not provided, create the expense without connecting to any staff
      expense = await prisma.expense.create({
        data: {
          name,
          amount,
          expireDate: expireDate ? parseInt(expireDate, 10) : null,
          description,
          category,
          expenseDate: afghanistanTime,
          createdAt: afghanistanTime,
        },
      });
    }

    return new Response(JSON.stringify(expense), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Expense data is not created" }),
      { status: 500 }
    );
  }
};
export const dynamic = "force-dynamic";
