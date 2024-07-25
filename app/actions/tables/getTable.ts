  // Import necessary modules and types
  import prisma from "@/app/libs/prismadb"; // Adjust path to your Prisma client setup
  import { TableType } from "@/types/singleTable";
  import { TableStatus } from "@prisma/client"; // Import TableStatus from Prisma client

  // Function to fetch table data by ID
  export default async function getTable(
    tableId: string
  ): Promise<TableType | null> {
    let tableId_Int = parseInt(tableId);

    // Get the start of today and one week ago
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const oneWeekAgo = new Date(startOfDay);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    try {
      // Fetch table data using Prisma
      const table = await prisma.table.findUnique({
        where: { id: tableId_Int },
        include: {
          bookingHistory: {
            where: {
              createdAt: {
                gte: oneWeekAgo,
                lte: endOfDay,
              },
            },
            include: {
              customer: {
                include: {
                  Order: {
                    include: {
                      orderItems: {
                        include: {
                          menuItem: { include: { orderItems: true } },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          incomeTransaction: true, // Include other relations if needed
        },
      });

      // If table is null, return null (or handle error as needed)
      if (!table) {
        return null;
      }

      // Map Prisma result to TableType
      const currentTable: TableType = {
        id: table.id,
        name: table.name,
        status: table.status as TableStatus, // Ensure to cast status to TableStatus
        createdAt: table.createdAt,
        updatedAt: table.updatedAt,
        bookingHistory: table.bookingHistory?.map((booking) => ({
          id: booking.id,
          customerName: booking.customerName,
          startTime: booking.startTime,
          endTime: booking.endTime,
          duration: booking.duration,
          amountEarned: booking.amountEarned ?? 0, // Default to 0 if amountEarned is null
          createdAt: booking.createdAt ?? new Date(), // Use a default date if createdAt is null
          tableId: booking.tableId,
          customerId: booking.customerId ?? 0, // Default to 0 if customerId is null
          customer: booking.customer as any, // Cast customer to appropriate type or handle null case
          Order: booking.customer?.Order.map((order) => ({
            id: order.id,
            total: order.total,
            createdAt: order.createdAt,
            tableId: order.tableId,
            customerId: order.customerId ?? 0, // Default to 0 if customerId is null
            orderItems: order.orderItems.map((orderItem) => ({
              id: orderItem.id,
              orderId: orderItem.orderId ?? 0, // Default to 0 if orderId is null
              itemId: orderItem.itemId,
              quantity: orderItem.quantity,
              subtotal: orderItem.subtotal ?? 0, // Default to 0 if subtotal is null
              profitOrder: orderItem.profitOrder ?? 0, // Default to 0 if profitOrder is null
              createdAt: orderItem.createdAt ?? new Date(), // Use a default date if createdAt is null
              menuItem: {
                id: orderItem.menuItem.id,
                createdAt: orderItem.menuItem.createdAt ?? new Date(), // Use a default date if createdAt is null
                orderItems: orderItem.menuItem.orderItems,
              },
            })),
          })),
        })),
      };

      return currentTable;
    } catch (error) {
      console.error("Error fetching table:", error);
      return null; // Return null or handle error appropriately
    }
  }
