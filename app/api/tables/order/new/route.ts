import prisma from "@/app/libs/prismadb";
import { DateTime } from "luxon";

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

export const POST = async (req: Request, res: Response) => {
  const { data } = await (req as any).json();
  const afghanistanTime = DateTime.local().setZone("Asia/Kabul");
  const newOrderTimestamp = afghanistanTime.plus({ hours: 4, minutes: 30 });

  const mergedArray = mergeArraysByPropertyName(
    data.inputValue,
    data.filteredItems,
    "name"
  );

  const totalSubtotal = mergedArray.reduce((total: any, item: any) => {
    const subtotal = item.price * item.quantity;
    return total + subtotal;
  }, 0);

  const errorCodes: any = [];
  // this code for decreament of countStock and error if quantity > stock
  let endcountStock = 0;
  let endStockName = "";
  try {
    mergedArray.forEach((item: any) => {
      if (Number(item.quantity) > Number(item.countStock)) {
        errorCodes.push({
          id: item.id,
          errorCode: "QUANTITY_EXCEEDS_STOCK",
        });
        endcountStock = item.menuItem.countStock;
        endStockName = item.menuItem.name;
      }
    });
    if (errorCodes.length > 0) {
      return new Response(
        `ببخشید شما ${endStockName} را بیشتر از میزان موجود (${endcountStock}) فرمایش دادید `,
        {
          status: 400,
        }
      );
    }
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
  } catch (error) {
    return new Response(`ببخشید فرمایش بدلیل مشکل ثبت نشد`, {
      status: 500,
    });
  }

  try {
    // Create order
    const lastCustomer = await prisma.bookingHistory.findFirst({
      where: {
        tableId: data.tableId,
        customerId: data.customerId,
      },
      orderBy: {
        id: "desc",
      },
    });

    const existOrder = await prisma.order.findFirst({
      where: {
        // customerId: lastCustomer?.id,
        customerId: data.customerId,
      },
      include: {
        orderItems: true,
      },
    });

    if (existOrder) {
      try {
        mergedArray.push(
          data.existedOrders.orderItems.map((item: any) => item)
        );

        // Flatten the nested array and destructure the name and price properties
        const flattenedArray = mergedArray.reduce((acc: any, current: any) => {
          if (Array.isArray(current)) {
            acc.push(
              ...current.map((item) => ({
                ...item,
                name: item.menuItem.name,
                price: item.menuItem.price,
                id: item.menuItem.id,
                countStock: item.menuItem.countStock,
              }))
            );
          } else {
            acc.push(current);
          }
          return acc;
        }, []);

        const totalSubtotal = flattenedArray.reduce((total: any, item: any) => {
          const subtotal = Number(item.price) * Number(item.quantity);
          return total + subtotal;
        }, 0);

        let endcountStock = 0;
        let endStockName = "";
        if (data.existedOrders) {
          try {
            flattenedArray.forEach((item: any) => {
              if (Number(item.quantity) > Number(item.countStock)) {
                errorCodes.push({
                  id: item.id,
                  errorCode: "QUANTITY_EXCEEDS_STOCK",
                });
                endcountStock = item.menuItem.countStock;
                endStockName = item.menuItem.name;
              }
            });

            if (errorCodes.length > 0) {
              return new Response(
                `ببخشید شما ${endStockName} را بیشتر از میزان موجود (${endcountStock}) فرمایش دادید `,
                {
                  status: 400,
                }
              );
            } else {
              if (flattenedArray[0].name === "") {
                return new Response(`ببخشید یکی از فرمایشات شما ناقص است `, {
                  status: 500,
                });
              }
              // this code to get the beforeCountStock quantity and minus it from incomming
              await Promise.all(
                flattenedArray.map(async (menuItem: any) => {
                  const { itemId, quantity } = menuItem;
                  try {
                    const beforeCountStock = await prisma.orderItem.findFirst({
                      where: { itemId: itemId, orderId: existOrder.id },
                    });
                    await prisma.menuItem.update({
                      where: { id: itemId },
                      data: {
                        countStock: {
                          decrement:
                            Number(quantity) -
                            Number(beforeCountStock?.quantity),
                        },
                      },
                    });
                  } catch (error) {
                    return new Response(` ببخشید فرمایش شما ثبت نشد `, {
                      status: 500,
                    });
                  }
                })
              );

              await prisma.orderItem.deleteMany({
                where: {
                  orderId: existOrder.id,
                },
              });

              const order = await prisma.order.update({
                where: {
                  id: existOrder.id,
                },
                data: {
                  total: totalSubtotal,
                  table: { connect: { id: data.existedOrders.tableId } },
                  // customer: { connect: { id: data.existedOrders.customerId } },
                  customer: { connect: { id: data.customerId } },
                  orderItems: {
                    create: flattenedArray.map((item: any) => ({
                      quantity: Number(item.quantity),
                      subtotal: Number(item.quantity) * Number(item.price),
                      itemId: item.id,
                    })),
                  },
                },
                include: {
                  orderItems: true,
                },
              });
              return new Response(JSON.stringify("order"), { status: 201 });
            }
          } catch (error) {
            return new Response(` ببخشید فرمایش شما ثبت نشد`, {
              status: 500,
            });
          }
        } else {
          await prisma.orderItem.createMany({
            data: mergedArray.map((item: any) => ({
              quantity: Number(item.quantity),
              subtotal: Number(item.quantity) * Number(item.price),
              itemId: item.id,
              orderId: existOrder.id,
              createdAt: newOrderTimestamp,
            })),
          });
        }

        return new Response(JSON.stringify("order"), { status: 201 });
      } catch (error) {
        return new Response(`ببخشید یکی از فرمایشات شما ناقص است `, {
          status: 500,
        });
      }
    } else {
      if (errorCodes.length > 0) {
        return new Response(
          `ببخشید شما ${endStockName} را بیشتر از میزان موجود (${endcountStock}) فرمایش دادید `,
          {
            status: 400,
          }
        );
      }
      // IF PREVIOUS ORDERS DOES NOT EXIST EXECUTE BELOW CODE
      else {
        const order = await prisma.order.create({
          data: {
            total: totalSubtotal,
            table: { connect: { id: data.tableId } },
            customer: { connect: { id: data.customerId } },
            createdAt: newOrderTimestamp.toString(),
            orderItems: {
              create: mergedArray.map((item: any) => ({
                quantity: Number(item.quantity),
                subtotal: Number(item.quantity) * Number(item.price),
                menuItem: { connect: { id: item.id } },
                createdAt: afghanistanTime,
              })),
            },
          },
          include: {
            orderItems: true,
          },
        });
        return new Response(JSON.stringify(order), { status: 201 });
      }
    }
  } catch (error) {
    return new Response(` ببخشید فرمایش شما ثبت نشد`, {
      status: 500,
    });
  }
};
