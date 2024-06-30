import prisma from "@/app/libs/prismadb";
const { DateTime } = require("luxon");

export const POST = async (req: Request) => {
  const data = await req.json();

  const customerName = data.customerName;
  const otherSalesData = data.items;

  const afghanistanTime = DateTime.local().setZone("Asia/Kabul");

  // Add 4 hours and 30 minutes to it
  const newOrderTimestamp = afghanistanTime.plus({ hours: 4, minutes: 30 });

  const menuItems = await prisma.menuItem.findMany({
    where: {
      name: {
        in: otherSalesData.map((item: any) => item.selectedOption),
      },
    },
  });

  const mergedData2 = otherSalesData.map((dataItem: any) => {
    const menuItem = menuItems.find(
      (item) => item.name === dataItem.selectedOption
    );

    if (menuItem) {
      return {
        selectedOption: menuItem.name,
        amount: dataItem.amount,
      };
    } else {
      return {
        selectedOption: dataItem.selectedOption,
        amount: dataItem.amount,
      };
    }
  });

  const latest = mergedData2.concat(menuItems);

  latest.forEach((item: any) => {
    if (item.selectedOption) {
      const matchingObject = latest.find(
        (obj: any) => obj.name === item.selectedOption
      );
      if (matchingObject) {
        matchingObject.amount = item.amount;
      }
    }
  });

  try {
    const itemNames = otherSalesData.map((item: any) => item.selectedOption);

    const menuItems: any = await prisma.menuItem.findMany({
      where: {
        name: {
          in: itemNames,
        },
      },
    });

    const ids = menuItems.map((item: any) => item.id);
    const filteredData = latest.filter((item: any) => item.price !== undefined);

    // DECREMENT THE COUNTSTOCK
    await Promise.all(
      filteredData.map(async (menuItem: any) => {
        const { id, amount } = menuItem;
        try {
          await prisma.menuItem.update({
            where: { id },
            data: {
              countStock: { decrement: parseInt(amount, 10) },
            },
          });
        } catch (error) {
          return new Response(`ببخشید فرمایش بدلیل مشکل ثبت نشد`, {
            status: 500,
          });
        }
      })
    );

    const sales = await prisma.otherSales.createMany({
      data: filteredData.map((item: any) => ({
        customerName,
        amount: item?.amount,
        price: Number(item?.amount) * Number(item?.price),
        menuItemId: item?.id,
        createdAt: newOrderTimestamp,
      })),
    });
    return new Response(JSON.stringify(sales), { status: 200 });
  } catch (error) {
    return new Response(`something went wrong, ${error}`, { status: 500 });
  }
};
