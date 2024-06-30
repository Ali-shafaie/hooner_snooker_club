import prisma from "@/app/libs/prismadb";

export const POST = async (req: Request) => {
  const { email } = await req.json();
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(`User couldn't be fetched ${error} `, { status: 500 });
  }
};
