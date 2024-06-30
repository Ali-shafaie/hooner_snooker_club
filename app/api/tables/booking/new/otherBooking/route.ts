// Import necessary modules
import prisma from "@/app/libs/prismadb";
import { DateTime } from "luxon";

export const POST = async (req: Request) => {
  const { DateTime } = require("luxon");

  const afghanistanTime = DateTime.local().setZone("Asia/Kabul");

  // Add 4 hours and 30 minutes to it
  const newOrderTimestamp = afghanistanTime.plus({ hours: 4, minutes: 30 });
  const { data } = await req.json();
  function mergeArraysByPropertyName(arr1: any, arr2: any, propertyName: any) {
    return arr1.map((item1: any) => {
      const matchingItem = arr2.find(
        (item2: any) => item2[propertyName] === item1[propertyName]
      );
      if (matchingItem) {
        return { ...item1, ...matchingItem };
      }
      return item1;
    });
  }

  const mergedArray = mergeArraysByPropertyName(
    data.inputList,
    data.filteredItems,
    "name"
  );
  const totalSubtotal = mergedArray.reduce((total: any, item: any) => {
    const subtotal = item.price * item.quantity;
    return total + subtotal;
  }, 0);

  const startTimeLuxon: any = DateTime.fromISO(data.values.startTime, {
    zone: "Asia/Kabul",
  });
  const endTimeLuxon: any = DateTime.fromISO(data.values.endTime, {
    zone: "Asia/Kabul",
  });

  try {
    const customer = await prisma.customer.create({
      data: { name: data.values.customerName },
    });

    const durationMillis = endTimeLuxon - startTimeLuxon; // Calculate duration in milliseconds
    const durationHours = durationMillis / (1000 * 60 * 60); // Convert milliseconds to hours

    // Assuming hourly rate is $200 per hour, you can change this as needed
    const hourlyRate = data.values.amountEarned;

    const amountEarned = durationHours * hourlyRate;

    const booking = await prisma.bookingHistory.create({
      data: {
        tableId: Number(data.values.tableId),
        customerId: customer.id,
        startTime: startTimeLuxon.toISO() as any,
        duration: null,
        amountEarned: amountEarned,
        endTime: endTimeLuxon.toISO() as any,
        createdAt: newOrderTimestamp,
      },
    });

    console.log("merged array", mergedArray);

    // create order for this booking
    const order = await prisma.order.create({
      data: {
        total: totalSubtotal,
        table: { connect: { id: Number(data.values.tableId) } },
        customer: { connect: { id: Number(customer.id) } },
        orderItems: {
          create: mergedArray.map((item: any) => ({
            quantity: Number(item.quantity),
            subtotal: Number(item.quantity) * Number(item.price),
            menuItem: { connect: { id: item.id } },
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    // Update menu items countStock
    await Promise.all(
      mergedArray.map(async (menuItem: any) => {
        const { id, quantity } = menuItem;
        try {
          await prisma.menuItem.update({
            where: { id },
            data: {
              countStock: { decrement: parseInt(quantity, 10) },
            },
          });
        } catch (error) {
          return new Response(`ببخشید فرمایش بدلیل مشکل ثبت نشد`, {
            status: 500,
          });
        }
      })
    );

    return new Response(JSON.stringify(booking), { status: 201 });
  } catch (error) {
    return new Response(`Error ${error} `, { status: 500 });
  }
};
