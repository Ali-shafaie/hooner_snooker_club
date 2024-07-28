import prisma from "@/app/libs/prismadb";
import { TableListResult } from "@/types/tables";

export default async function getTableList(
  startDate?: string,
  endDate?: string
): Promise<TableListResult> {
  try {
    const tables = await prisma.table.findMany({
      include: {
        bookingHistory: {
          where: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          include: {
            customer: true,
          },
        },
        incomeTransaction: true,
      },
    });

    if (!tables) {
      throw new Error("Tables not found");
    }

    const totalTables = tables.length;

    const totalAmountEarned = tables.reduce((acc, table) => {
      const amountEarnedArray = table.bookingHistory.map(
        (booking) => booking.amountEarned ?? 0
      );
      const tableTotalAmountEarned = amountEarnedArray.reduce(
        (total, amount) => total + amount,
        0
      );
      return acc + tableTotalAmountEarned;
    }, 0);

    return {
      totalAmountEarned,
      totalTables,
    };
  } catch (error) {
    console.error("Error fetching tables:", error);
    throw new Error("Table couldn't be fetched");
  }
}
