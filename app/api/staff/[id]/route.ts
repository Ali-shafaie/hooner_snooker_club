import prisma from "@/app/libs/prismadb";

export const PATCH = async (
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  const body = await req.json();
  const { name, phone, job } = body;
  const staffId = parseInt(id, 10);

  try {
    const staff = await prisma.staff.update({
      where: { staff_id: staffId },
      data: {
        name,
        phone,
        job,
      },
    });
    console.log(staff);

    return new Response(JSON.stringify(staff), { status: 201 });
  } catch (error) {
    console.log(error);
  }
};

export const DELETE = async (
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  const staffId = parseInt(id, 10);
  try {
    await prisma.staff.delete({
      where: { staff_id: staffId },
    });
    return new Response(JSON.stringify("You successfully deleted"), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
