import prisma from "@/app/libs/prismadb";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { name, phone, job } = body;
  try {
    const staff = await prisma.staff.create({
      data: {
        name,
        phone,
        job,
      },
    });
    return new Response(JSON.stringify(staff), { status: 201 });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify(error), { status: 500 });
  }
};
