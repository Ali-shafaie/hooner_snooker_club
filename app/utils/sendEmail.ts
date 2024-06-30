import nodemailer from "nodemailer";

const sendEmail = async (options: any) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "omer.zubair01@gmail.com",
      pass: "ivqzjjxnxzlslvpm",
    },
  });

  const message = {
    from: `${process.env.STMP_FROM_NAME} < ${process.env.STMP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);
};

export default sendEmail;
