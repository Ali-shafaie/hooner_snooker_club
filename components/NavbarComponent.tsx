"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    toast.success("شما موفقانه از حساب خود خارج شدید");
    window.location.href = "/auth/signin";
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-gray-50 z-50 shadow-md w-full sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex  items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src={"/assets/logopng.png"}
                alt="the logo"
                height={50}
                width={50}
              />
            </Link>
          </div>

          <div className="">
            <div className="text-2xl hover:text-green-700">
              <Popover>
                <PopoverTrigger>
                  <BsPersonCircle />
                </PopoverTrigger>
                <PopoverContent>
                  <div className="bg-gray-50 z-10 px-10 py-4">
                    <Link href={"/profile"}>
                      <div className="flex flex-row gap-2 text-md hover:text-green-700">
                        <BsPersonCircle />
                        <p>پروفایل</p>
                      </div>
                    </Link>
                    <div className="border border-b-1 my-2"></div>
                    <Link href={""}>
                      <div
                        className="flex flex-row gap-2 text-md hover:text-green-700"
                        onClick={handleSignOut}
                      >
                        <CgLogOut />
                        <p>خروج</p>
                      </div>
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
