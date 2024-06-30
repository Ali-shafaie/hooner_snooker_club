import prisma from "@/app/libs/prismadb";
import crypto from "crypto";
const bcrypt = require("bcrypt");

const hashPassword = async (password: any) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const POST = async (req: Request) => {
  const { token, password, confirmPassword } = await req.json();

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken,
      resetPasswordExpireDate: { gt: new Date(Date.now()) },
    },
  });

  if (!user) {
    return new Response(JSON.stringify(`User not found with this token`), {
      status: 404,
    });
  }

  if (password !== confirmPassword) {
    return new Response(
      JSON.stringify(`Password and Confirmation password does not matched`),
      {
        status: 400,
      }
    );
  }

  try {
    const userupdate = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await hashPassword(password),
        resetPasswordToken: null,
        resetPasswordExpireDate: null,
      },
    });
    return new Response(JSON.stringify(`Password Updated successfully`), {
      status: 200,
    });
  } catch (error) {
    console.log("Errror while udpating password", error);
  }
};
