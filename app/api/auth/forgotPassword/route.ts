import prisma from "@/app/libs/prismadb";
import crypto from "crypto";
import sendEmail from "../../../utils/sendEmail";

export const POST = async (req: Request) => {
  const { email } = await req.json();
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return new Response(JSON.stringify(`ببخشید ایمیل را اشتباه وارد کردید`), {
        status: 400,
      });
    }

    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash and set to resetPasswordToken field
    const resetedPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set token expire time
    const resetedPasswordExpireDate = Date.now() + 30 * 60 * 1000;

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetPasswordToken: resetedPasswordToken,
        resetPasswordExpireDate: new Date(resetedPasswordExpireDate),
      },
    });

    // // Create reset password url
    const resetUrl = `https://honarsnookerclub.vercel.app/password/reset/${resetToken}`;

    const message = `لینک تغیر پسورد شما قرار ذیل است: \n\n ${resetUrl} \n\n\ If you have not requested this email, then ignore it.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Honar Snooker Club Password Recovery",
        message,
      });

      return new Response(
        JSON.stringify(`لینک تغیر رمز به ایمیل ارسال شد ${user.email}`),
        {
          status: 200,
        }
      );
    } catch (error) {
      return new Response(`Error accured please try again ${error} `, {
        status: 500,
      });
    }
  } catch (error) {
    return new Response(`Error accured please try again ${error}`, {
      status: 500,
    });
  }
};
