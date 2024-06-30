import prisma from "@/app/libs/prismadb";
import axios from "axios";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id }: any = params;

  try {
    const table = await prisma.table.findUnique({
      where: { id },
      include: { bookingHistory: { include: { customer: true } } },
    });

    return new Response(JSON.stringify(table), { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id }: any = params;
  console.log(id, "dd12345654");

  try {
    const updated = await prisma.table.update({
      where: { id },
      data: { status: "FREE" },
    });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};
