import { authOptions } from "@/app/libs/authOptions";
import NavbarComponent from "../NavbarComponent";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return <NavbarComponent />;
};

export default Navbar;
