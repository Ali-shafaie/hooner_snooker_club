import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  const { email, username, password, role } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role: role.toUpperCase(),
      },
    });
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response("Something went wrong ", { status: 500 });
  }
};
export const dynamic = "force-dynamic";
