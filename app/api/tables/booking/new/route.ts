// Import necessary modules
import prisma from "@/app/libs/prismadb";
import { DateTime } from "luxon";

// Define the POST request handler
export const POST = async (req: Request) => {
  // Parse the request body
  const { tableId, customerName, amountEarned, duration, startTime, endTime } =
    await req.json();

  const { DateTime } = require("luxon");

  const afghanistanTime = DateTime.local().setZone("Asia/Kabul");

 
  // Convert time-related data
  const startTimeLuxon = DateTime.fromISO(startTime, { zone: "Asia/Kabul" });
  const endTimeLuxon = DateTime.fromISO(startTime, { zone: "Asia/Kabul" });

  try {
    // Create a new customer
    const customer = await prisma.customer.create({
      data: { name: customerName },
    });

    // Create a booking for the new customer
    const booking = await prisma.bookingHistory.create({
      data: {
        tableId,
        customerId: customer.id,
        startTime: startTimeLuxon.toISO() as any,
        duration,
        amountEarned,
        endTime,
        createdAt: endTimeLuxon,
      },
    });

    // Change the table status
    if (booking) {
      await prisma.table.update({
        where: { id: tableId },
        data: { status: "BUSY" },
      });
    }

    // Respond with the created booking
    return new Response(JSON.stringify(booking), { status: 201 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};
