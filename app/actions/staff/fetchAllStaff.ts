import prisma from "@/app/libs/prismadb";

export default async function fetchAllStaff() {
  try {
    const staffs = await prisma.staff.findMany({});
    return staffs;
  } catch (error) {
    return new Response("Order couldn't be fetched", { status: 500 });
  }
}
