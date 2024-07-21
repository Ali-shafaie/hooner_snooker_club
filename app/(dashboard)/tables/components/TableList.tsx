"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import AddNewPlayerForm from "./AddNewPlayerForm";
import UpdateTable from "./UpdateTable";
import CounterUp from "@/components/CounterUp";
import { useRouter } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";
import { ChevronsUpDown } from "lucide-react";
import SaveOrder from "./SaveOrder";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSession } from "next-auth/react";

interface TableListProps {
  table: any;
  menuItem: any;
}

const TableList: React.FC<TableListProps> = ({ table, menuItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = useState<any>({});

  const { data: session } = useSession();

  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const openOrderModal = () => {
    setIsOrderModalOpen(true);
  };
  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  const lastBooking = table.bookingHistory.reduce(
    (prev: any, current: any) => {
      return current.id > prev.id ? current : prev;
    },
    { id: -Infinity }
  );
  const handleDeleteTable = async (id: any) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/tables/deleteTable", {
        tableId: id,
      });

      toast.success("Table deleted successfully");
      setLoading(false);
    } catch (error) {
      toast.error("Sorry something went wrong");
      setLoading(false);
    }
  };

  const handleChangeTableStatus = async () => {
    try {
      const date = Date.now();
      const { data } = await axios.put("/api/tables/updateTableStatus", {
        id: table.id,
      });

      const { data: booking } = await axios.post(
        "/api/tables/updateBookingEndTime",
        {
          id: table.id,
          endTime: date,
        }
      );
      const { data: amount } = await axios.post(
        "/api/tables/updateBookingAmount",
        {
          id: table.id,
          booking,
        }
      );

      window.location.href = `/tables/${table.id}`;
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  function formatDate(inputDate: any) {
    const date = new Date(inputDate);

    // Format date
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;

    // Format time
    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = date.getMinutes();
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    const formattedTime = `${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}`;
    return `${formattedDate}, ${formattedTime}`;
  }

  const StartDateTime = lastBooking.startTime;
  const formattedDateString = formatDate(StartDateTime);

  const customerName = lastBooking?.customer?.name;
  // asdf
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      const printContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Print Bill</title>
          <style>
            /* Add your print styles here */
            body {
              font-family: Arial, sans-serif;
              direction: rtl;
              padding-bottem:20px;
            }
            .print-title {
              text-align: center;
              font-size: 20px;
              font-weight: bold;
            }
            .print-logo {
              text-align: center;
              -margin-top:20px
            }
            .print-list {
              margin-top: 10px;
            }
            .span-list {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              white-space: nowrap;
              border-bottom:1px dashed black;
            }
            .span-sign{
              margin-top:30px;
              margin-bottom:20px;
              display:flex;
              justify-content: space-between;
              border-top: 1px dashed #000
            }
            .span-down{
              margin-top:30px;
              margin-bottom:20px;
              display:flex;
              justify-content: space-between;
              border-top: 0.2px dashed #ddd;
            }
            
          </style>
        </head>
        <body>
        <div class="print-logo">
        <img src='/assets/logopng.png' alt="Logo" width="100" height="100"/>
      </div>
      <div style="padding-right:20px; padding-left:20px">
      <div class="print-title" >${table.name}</div>
      <div class="print-list">
      <div class="span-list">
      <span class="">اسم مشتری : </span>
      <span class="">${customerName}</span>
      </div>
      <div class="span-list">
      <span class="">شروع بازی : </span>
      <span class="" style="font-size:13px" dir="ltr">${formattedDateString}</span>
      </div>
      <div class="span-sign " style="padding-bottom:10px">
      <span class=""></span>
      <span class="" style="font-size:13px">محل امضاء</span>
      </div> 
      <div class="span-down " style="padding-bottom:10px">
      <span class=""></span>
      <span class="" style="font-size:13px"> </span>
      </div>
      </div>
      </div>
      </body>
      </html>
      `;

      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    }
  };

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

  return (
    <div className="relative">
      <Collapsible
        open={table.status === "BUSY" ? true : isOpen}
        onOpenChange={setIsOpen}
        className=" space-y-2 mt-5"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4
            className={`text-md font-semibold  py-2 px-3 ${
              table.status === "BUSY" ? "text-red-600" : "text-green-600"
            } ${
              table.status === "BOOKED" && "text-orange-500"
            } font-extrabold text-[16px] `}
            onClick={() => setIsOpen(!isOpen)}
          >
            {table.name}{" "}
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown
                className={`h-4 w-4  ${
                  table.status === "BUSY" ? "text-red-600" : "text-green-600"
                } text-lg font-extrabold`}
              />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2 relative">
          <div
            className={`border-4 ${
              table.status === "BUSY" ? "border-red-500" : "border-green-500"
            } ${
              table.status === "BOOKED" && "border-orange-600"
            } p-1 mt-4 rounded-md relative`}
          >
            <Image
              src={"/images/table.jpg"}
              alt="Table "
              width={1000}
              height={1000}
              quality={5}
              className="w-full h-96"
            />
            <div className="absolute top-5 right-2 text-white w-full">
              <div className="flex space-x-5 items-center justify-between w-full">
                {/*   {user?.role === "ADMIN" && (
                  <div className=" z-10 relative inline-block group">
                    <div className="w-8 h-8 bg-[#1c9239] rounded-full flex items-center justify-center cursor-pointer group-hover:bg-gray-500">
                      <Settings strokeWidth={1.75} />
                    </div>
                    <div className="absolute right-2 mt-[1px] w-36 bg-white border border-gray-300 rounded-md shadow-lg group-hover:block hidden">
                      <p
                        className="px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center justify-between"
                        onClick={openUpdateModal}
                      >
                        <p className="ml-3 whitespace-nowrap"> ویرایش میز</p>
                        <Pencil color="#1c9239" size="19" />
                      </p>
                      <p
                        className="px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center justify-between"
                        onClick={() => handleDeleteTable(table.id)}
                      >
                        {loading && <Loader2 className="" />}
                        <p className="ml-3 whitespace-nowrap"> حذف میز</p>
                        {!loading && <Trash2 color="#ff0000" size="19" />}
                      </p>
                    </div>
                  </div>
                )} */}
                <div className="">
                  <p className="text-sm md:text-lg mr-1 font-bold whitespace-nowrap capitalize">
                    {table.name}
                  </p>
                </div>
                <div className="flex flex-row-reverse flex-[0.8] items-center justify-start text-xs md:text-md px-3">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <Button
                      className="bg-green-600"
                      onClick={
                        table.status === "BUSY"
                          ? handleChangeTableStatus
                          : openModal
                      }
                      size="sm"
                      // disabled={table.status === "BUSY"}
                    >
                      {table.status === "BUSY" ? "متوقف" : "شروع"}
                    </Button>
                    {table.status === "BUSY" && (
                      <Button
                        size={"sm"}
                        className="bg-green-600 hidden md:block  mx-1 py-1 px-2 mt-1 whitespace-nowrap"
                        onClick={handlePrint}
                      >
                        چاپ بل
                      </Button>
                    )}
                  </div>
                  {table.status === "BUSY" && (
                    <div className="ml-2">
                      <Button
                        className="bg-green-600 whitespace-nowrap "
                        onClick={openOrderModal}
                        size="sm"
                        disabled={table.status === "ّFREE"}
                      >
                        ثبت سفارش
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              {table.status === "BUSY" && (
                <div className="absolute left-[40px] top-[160px] md:left-[238px] md:top-[125px]">
                  <CounterUp
                    tableId={table.id}
                    //  startTime={
                    //   table?.bookingHistory[table?.bookingHistory.length - 1]
                    //     ?.startTime

                    // }
                    startTime={lastBooking.startTime}
                  />
                </div>
              )}
              <div>
                <div
                  className={`absolute left-[40px] top-[100px]  ${
                    table.bookingHistory.length > 0 &&
                    "max-h-36 overflow-y-auto  p-4 scrollbar-hide hidden md:block"
                  } `}
                >
                  {" "}
                  <p className="py-2 left-4">تاریخچه امروز بوکینگ</p>
                  {table.bookingHistory
                    .filter(
                      (item: any) =>
                        item.tableId === table.id &&
                        new Date(item.startTime).getDate() ===
                          new Date().getDate()
                    )
                    .map((time: any) => {
                      const startDateTime = new Date(time.startTime);
                      const starthours = startDateTime.getHours();
                      const startminutes = startDateTime.getMinutes();
                      let startformattedHours;

                      if (starthours === 0) {
                        startformattedHours = 12; // 12 AM
                      } else if (starthours > 12) {
                        startformattedHours = starthours - 12; // Convert from 24-hour to 12-hour format for PM
                      } else {
                        startformattedHours = starthours; // AM hours remain the same
                      }

                      const date = new Date(time.endTime);
                      const endHour = date.getHours();
                      const endMinute = date.getMinutes();
                      let formatEndHour = 0;

                      if (endHour === 0) {
                        formatEndHour = 12; // 12 AM
                      } else if (endHour > 12) {
                        formatEndHour = endHour - 12; // Convert from 24-hour to 12-hour format for PM
                      } else {
                        formatEndHour = endHour; // AM hours remain the same
                      }

                      return (
                        <div
                          key={time.id}
                          className="flex text-left space-x-12"
                        >
                          <div className="text-bold text-md">
                            <span className="-left-[200px] flex items-center">
                              {time.endTime && (
                                <div>
                                  {"  "}
                                  {endMinute} : {formatEndHour}
                                  {" ____ "}
                                  {startminutes} {" : "} {startformattedHours}{" "}
                                </div>
                              )}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="absolute left-7 bottom-5 text-white">
              <Button
                onClick={() => router.push(`/tables/${table.id}`)}
                className="bg-green-500 px-4 "
                size="sm"
              >
                جزئیات
              </Button>
            </div>

            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              title={`شروع بازی جدید ${table.name}`}
              size="large"
            >
              <AddNewPlayerForm tableId={table.id} onModalClose={closeModal} />
            </Modal>

            <Modal
              isOpen={isUpdateModalOpen}
              onClose={closeUpdateModal}
              title={`  ویرایش میز (${table.name}) `}
              size="large"
            >
              <UpdateTable
                tableId={table.id}
                closeUpdateModal={closeUpdateModal}
                tablename={table.name}
              />
            </Modal>
            <Modal
              isOpen={isOrderModalOpen}
              onClose={closeOrderModal}
              title={`  ثبت فرمایش  (${table.name})`}
              size="medium"
            >
              <SaveOrder
                tableId={table.id}
                closeOrderModal={closeOrderModal}
                tablename={table.name}
                items={menuItem}
              />
              {/* <NewTableOrderForm /> */}
            </Modal>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default TableList;
