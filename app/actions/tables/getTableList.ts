import prisma from "@/app/libs/prismadb";
import { TablesType, Booking, Customer } from "@/types/tables";

export const getTableList = async (): Promise<TablesType[]> => {
  try {
    const tables = await prisma.table.findMany({
      include: {
        bookingHistory: {
          include: {
            customer: true,
          },
        },
      },
    });

    const parsedTables: TablesType[] = tables.map((table) => ({
      id: table.id,
      name: table.name,
      status: table.status,
      createdAt: table.createdAt ? new Date(table.createdAt) : null,
      updatedAt: table.updatedAt ? new Date(table.updatedAt) : null,
      bookingHistory: table.bookingHistory.map((booking) => ({
        id: booking.id,
        startTime: booking.startTime ? new Date(booking.startTime) : null,
        endTime: booking.endTime ? new Date(booking.endTime) : null,
        duration:
          booking.duration !== null ? Number(booking.duration) : undefined,
        amountEarned: booking.amountEarned !== null ? booking.amountEarned : 0, // Provide a default value or handle accordingly
        createdAt: booking.createdAt ? new Date(booking.createdAt) : null,
        customer: booking.customer || null,
        customerId: booking.customerId !== null ? booking.customerId : null,
        customerName: booking.customerName || null,
        tableId: booking.tableId,
      })),
    }));

    return parsedTables;
  } catch (error) {
    console.error("Error fetching table data:", error);
    return [];
  }
};
