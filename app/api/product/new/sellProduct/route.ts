import prisma from "@/app/libs/prismadb";
import { DateTime } from "luxon";

export const POST = async (req: Request) => {
  const data = await req.json();

  const afghanistanTime = DateTime.local().setZone("Asia/Kabul");


  const { selectedOption } = data;

  const product = await prisma.products.findFirst({
    where: {
      name: selectedOption,
    },
  });

  if (Number(product?.countStock) < Number(data.amount)) {
    return new Response(
      JSON.stringify(
        " ببخشید شما میزان محصول را بلندتر از حد موجود انتخاب کردید"
      ),
      { status: 400 }
    );
  } else {
    await prisma.products.update({
      where: {
        id: product?.id,
      },

      data: {
        countStock: {
          decrement: Number(data.amount),
        },
      },
    });
    try {
      const sellProduct = await prisma.sellProduct.create({
        data: {
          countStock: Number(data.amount),
          customerName: data.customerName,
          price: Number(data.amount) * Number(product?.sellPrice),
          productId: Number(product?.id),
          createdAt: afghanistanTime.toString(),

          productProfit:
            (Number(product?.sellPrice) - Number(product?.buyPrice)) *
            Number(data.amount),
        },
      });
      return new Response(JSON.stringify(sellProduct), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify(`Internal Server Error ${error}`), {
        status: 500,
      });
    }
  }
};
