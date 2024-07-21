"use server";

import prisma from "@/app/libs/prismadb";
import { BookingSchemas } from "@/schemas";
import { z } from "zod";

export const createnNewMenuItemOrder = async (
  values: z.infer<typeof BookingSchemas>
) => {
  const validatedFields = BookingSchemas.safeParse(values);
  if (!validatedFields.success) {
    return null;
  }

  const { DateTime } = require("luxon");
  // Convert time-related data
  const { customerName, startTime, amountEarned, tableId } =
    validatedFields.data;
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
        amountEarned,
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
    return { success: "شما موفقانه میز را شروع کردید!" };
  } catch (error) {
    console.error("Error creating/updating account:", error);
    return { error: "An error occurred while processing your request." };
  }
};
