"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSolidDashboard } from "react-icons/bi";

import React from "react";
import { Menu, Table, UserCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>({});

  const { data: session } = useSession();

  useEffect(() => {
    const email = session?.user?.email;
    const fetchUser = async () => {
      const { data } = await axios.post("/api/auth/getUserByEmail", {
        email,
      });
      setUser(data);
    };
    if (session?.user) {
      fetchUser();
    }
  }, [session?.user]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed w-0 md:w-64 h-full right-0">
      <div className="flex md:hidden  mt-6 mr-4">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent className="bg-white">
            <SheetHeader>
              <div className="h-full px-3 py-12 overflow-y-auto">
                <ul className="space-y-2 font-medium">
                  {user?.role === "ADMIN" && (
                    <li className="hover:bg-gray-300 hover:text-gray-700 rounded-[5px]">
                      <Link
                        href={"/"}
                        className="flex items-center p-2 text-green-700 hover:text-gray-900 rounded-[10px] dark:text-white hover:bg-white dark:hover:bg-gray-700 group"
                      >
                        <svg
                          className="w-5 h-5 text-green-700 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 21"
                        >
                          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        <span className=" ml-3 mr-3">داشبورد</span>
                      </Link>
                    </li>
                  )}
                  <li className="hover:bg-gray-300 hover:text-gray-700 rounded-[5px]">
                    <Link
                      href={"/tables"}
                      className="flex items-center p-2 hover:text-gray-900 rounded-[10px] dark:hover:bg-gray-700 group"
                    >
                      <Table />
                      <span className=" flex-1 ml-3 whitespace-nowrap mr-3">
                        میزها
                      </span>
                    </Link>
                  </li>
                  {/* <li>
              <Link
                href={`/reports`}
                className="flex items-center p-2 hover:text-gray-900 text-green-700 rounded-[10px] dark:text-white hover:bg-white dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-700 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap mr-3">
                  گزارشات
                </span>
              </Link>
            </li> */}
                  {user?.role === "ADMIN" && (
                    <li className="hover:bg-gray-300 hover:text-gray-700 rounded-[5px]">
                      <Link
                        href={`/expense`}
                        className="flex items-center p-2 hover:text-gray-900 text-green-700 rounded-[10px] dark:text-white  dark:hover:bg-gray-700 group"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-clipboard-paste"
                        >
                          <path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z" />
                          <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10" />
                          <path d="m17 10 4 4-4 4" />
                        </svg>
                        <span className="flex-1 ml-3 whitespace-nowrap mr-3">
                          مصارف
                        </span>
                      </Link>
                    </li>
                  )}
                  <li className="hover:bg-gray-300 hover:text-gray-700 rounded-[5px]">
                    <Link
                      href={"/caffe"}
                      className="flex items-center p-2 hover:text-gray-900 text-green-700 rounded-[10px] dark:text-white hover:bg-gryay-400 dark:hover:bg-gray-700 group"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-700 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="flex-1 ml-3 whitespace-nowrap mr-3">
                        منیو ها
                      </span>
                      <span className="inline-flex items-center justify-center w-3 h-3 p-3 sm:ml-3 mr-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        3
                      </span>
                    </Link>
                  </li>
                  {/* <li>
              <Link
                href={"/setting"}
                className="flex items-center p-2 hover:text-gray-900 text-green-700 rounded-[10px] dark:text-white hover:bg-white dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-700 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap mr-3">
                  تنظیمات
                </span>
              </Link>
            </li> */}

                  <li className="hover:bg-gray-300 hover:text-gray-700 rounded-[5px]">
                    <Link
                      href={"/products"}
                      className="flex items-center p-2 hover:text-gray-900 text-green-700 rounded-[10px] dark:text-white  dark:hover:bg-gray-700 group"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-700 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 20"
                      >
                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                      </svg>
                      <span className=" flex-1 ml-3 whitespace-nowrap mr-3">
                        محصولات
                      </span>
                    </Link>
                  </li>
                  {user?.role === "ADMIN" && (
                    <li className="hover:bg-gray-300 hover:text-gray-700 rounded-[5px]">
                      <Link
                        href={"/otherTables"}
                        className="flex items-center p-2 hover:text-gray-900 text-green-700 rounded-[10px] dark:text-white hover:bg-white dark:hover:bg-gray-700 group"
                      >
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-green-700 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="flex-1 ml-3 whitespace-nowrap mr-3">
                          میز های متفرقه
                        </span>
                      </Link>
                    </li>
                  )}
                  <li className="hover:bg-gray-300 hover:text-gray-700 rounded-[5px]">
                    <Link
                      href={"/sales"}
                      className="flex items-center p-2 hover:text-gray-900 text-green-700 rounded-[10px] dark:text-white  dark:hover:bg-gray-700 group"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-700 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 20"
                      >
                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                      </svg>
                      <span className=" flex-1 ml-3 whitespace-nowrap mr-3">
                        فروشات متفرقه
                      </span>
                    </Link>
                  </li>
                  {user?.role === "ADMIN" && (
                    <li className="hover:bg-gray-300 hover:text-gray-700 rounded-[5px]">
                      <Link
                        href={"/users/new"}
                        className="flex items-center p-2 hover:text-gray-900 text-green-700 rounded-[10px] dark:text-white hover:bg-white dark:hover:bg-gray-700 group"
                      >
                        <UserCheck />
                        <span className=" flex-1 ml-3 whitespace-nowrap mr-3 text-green-700">
                          ثبت کاربر
                        </span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <aside
        id="default-sidebar"
        className="hidden md:block fixed right-0 top-16 z-40 w-full sm:w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-12 overflow-y-auto bg-gray-300 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {user?.role === "ADMIN" && (
              <li>
                <Link
                  href={"/"}
                  className="flex items-center p-2 text-green-700 hover:text-gray-900 rounded-[10px] dark:text-white hover:bg-white dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-green-700 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className=" ml-3 mr-3">داشبورد</span>
                </Link>
              </li>
            )}
            <li>
              <Link
                href={"/tables"}
                className="flex items-center p-2 hover:text-gray-900 text-white rounded-[10px] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Table />
                <span className=" flex-1 ml-3 whitespace-nowrap mr-3">
                  میزها
                </span>
              </Link>
            </li>
            {/* <li>
              <Link
                href={`/reports`}
                className="flex items-center p-2 hover:text-gray-900 text-green-700 rounded-[10px] dark:text-white hover:bg-white dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-700 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap mr-3">
                  گزارشات
                </span>
              </Link>
            </li> */}
            {user?.role === "ADMIN" && (
              <li>
                <Link
                  href={`/expense`}
                  className="flex items-center p-2 hover:text-gray-900 text-green-700 rounded-[10px] dark:text-white hover:bg-white dark:hover:bg-gray-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-clipboard-paste"
                  >
                    <path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z" />
                    <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10" />
                    <path d="m17 10 4 4-4 4" />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap mr-3">
                    مصارف
                  </span>
                </Link>
              </li>
            )}
            <li>
              <Link
                href={"/caffe"}
                className="flex items-center p-2 hover:text-gray-900 text-green-700 rounded-[10px] dark:text-white hover:bg-white dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-700 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap mr-3">
                  منیو ها
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 sm:ml-3 mr-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </Link>
            </li>
            {/* <li>
              <Link
                href={"/setting"}
                className="flex items-center p-2 hover:text-gray-900 text-green-700 rounded-[10px] dark:text-white hover:bg-white dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-700 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap mr-3">
                  تنظیمات
                </span>
              </Link>
            </li> */}

            <li>
              <Link
                href={"/products"}
                className="flex items-center p-2 hover:text-gray-900 text-green-700 rounded-[10px] dark:text-white hover:bg-white dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-700 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span className=" flex-1 ml-3 whitespace-nowrap mr-3">
                  محصولات
                </span>
              </Link>
            </li>
            {user?.role === "ADMIN" && (
              <li>
                <Link
                  href={"/otherTables"}
                  className="flex items-center p-2 hover:text-gray-900 text-green-700 rounded-[10px] dark:text-white hover:bg-white dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-700 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap mr-3">
                    میز های متفرقه
                  </span>
                </Link>
              </li>
            )}
            <li>
              <Link
                href={"/sales"}
                className="flex items-center p-2 hover:text-gray-900 text-green-700 rounded-[10px] dark:text-white hover:bg-white dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-700 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span className=" flex-1 ml-3 whitespace-nowrap mr-3">
                  فروشات متفرقه
                </span>
              </Link>
            </li>
            {user?.role === "ADMIN" && (
              <li>
                <Link
                  href={"/users/new"}
                  className="flex items-center p-2 hover:text-gray-900 text-green-700 rounded-[10px] dark:text-white hover:bg-white dark:hover:bg-gray-700 group"
                >
                  <UserCheck />
                  <span className=" flex-1 ml-3 whitespace-nowrap mr-3 text-green-700">
                    ثبت کاربر
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </aside>
      {/**************** Aside for responsive ***********************/}
    </div>
  );
}
