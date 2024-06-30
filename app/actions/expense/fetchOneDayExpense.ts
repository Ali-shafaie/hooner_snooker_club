// Assuming getOneDayExpense is a Promise-based function

export default async function getOneDayExpense(startDate: any, endDate: any) {
  const defaultStartDate = startDate || new Date();
  const defaultEndDate = endDate || new Date();
  try {
    const expenses = await prisma?.expense.findMany({
      where: {
        createdAt: {
          gte: defaultStartDate,
          lte: defaultEndDate,
        },
      },
    });
    console.log(expenses);

    return expenses;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw new Error("Error fetching expenses");
  }
}
