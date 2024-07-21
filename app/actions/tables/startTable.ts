"use server";

import prisma from "@/app/libs/prismadb";
import { startTableSchema } from "@/schemas";
import { z } from "zod";

export const createTable = async (values: z.infer<typeof startTableSchema>) => {
  const validatedFields = startTableSchema.safeParse(values);
  if (!validatedFields.success) {
    return null;
  }
  const { name } = validatedFields.data;

  try {
    await prisma.table.create({
      data: {
        name,
        status: "FREE",
      },
    });
    return { success: "شما موفقانه میز را شروع کردید!" };
  } catch (error) {
    console.error("Error creating/updating account:", error);
    return { error: "An error occurred while processing your request." };
  }
};
