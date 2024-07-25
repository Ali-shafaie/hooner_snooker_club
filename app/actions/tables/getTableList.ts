"use server";

import prisma from "@/app/libs/prismadb";
import { TablesType } from "@/types/tables";

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
        amountEarned: booking.amountEarned !== null ? booking.amountEarned : 0,
        createdAt: booking.createdAt ? new Date(booking.createdAt) : null,
        customer: booking.customer || null,
        customerId: booking.customerId !== null ? booking.customerId : null,
        customerName: booking.customerName || null,
        tableId: booking.tableId,
      })),
    }));

    // Sort the tables such that those with status "BUSY" come first in descending order
    const sortedTables = parsedTables.sort((a, b) => {
      if (a.status === "BUSY" && b.status !== "BUSY") return -1;
      if (a.status !== "BUSY" && b.status === "BUSY") return 1;
      return 0;
    });

    return sortedTables;
  } catch (error) {
    console.error("Error fetching table data:", error);
    return [];
  }
};
