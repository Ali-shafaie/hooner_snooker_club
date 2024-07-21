import * as z from "zod";

export const startTableSchema = z.object({
  name: z.string().min(3, { message: "لطفان نام میز را وارید نماید." }),
});

export const BookingSchemas = z.object({
  customerName: z
    .string()
    .min(3, { message: "لطفان نام مشتری را وارید نماید." }),
  startTime: z.string({
    message: "لطفان تاریخ شروع را مشخص نماید!.",
  }),
  amountEarned: z
    .number()
    .min(2, { message: "لطفان مقدار پول را مشخص نماید!." }),
  tableId: z.number(),
});

export const menuItemSchema = z.object({
  name: z.string().nonempty("Name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export const startTableMenuItemSchema = z.object({
  menuItems: z.array(menuItemSchema),
});
