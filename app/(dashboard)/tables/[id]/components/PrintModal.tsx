import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { AiOutlineWhatsApp } from "react-icons/ai";
//@ts-ignore
import html2pdf from "html2pdf.js";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  countStock: number;
  category: string;
}

interface OrderItem {
  id: number;
  itemId: number;
  quantity: number;
  subtotal: string;
  menuItem: MenuItem;
}

interface Order {
  id: number;
  total: string;
  tableId: number;
  customerId: number;
  orderItems: OrderItem[];
}

interface CustomerType {
  id: number;
  name: string;
  Order: Order[];
}

interface BookingHistoryItem {
  id: number;
  customer: CustomerType;
  startTime: string;
  endTime: string;
  duration: string;
  amountEarned: number;
}

interface ModalProps {
  onClose: () => void;
  onSave: () => void;
  currentItems: any;
}

const Modal: React.FC<ModalProps> = ({ currentItems, onClose, onSave }) => {
  const modalRef = useRef(null);

  const widthPage = 148 / 16;
  const heightPage = 210 / 16;

  const formatDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = dateObject.getMonth();
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const period = hours >= 12 ? "PM" : "AM";

    const formattedDate = `${day}/${monthNames[month]?.slice(0, 3)}/${String(
      year
    ).slice(2)}`;
    const formattedTime = `${hours % 12}:${
      (minutes < 10 ? "0" : "") + minutes
    } ${period}`;

    return `${formattedDate}, ${formattedTime}`;
  };
  const printToPdf = () => {
    //@ts-ignore
    const printPageElement = modalRef.current?.querySelector(
      ".print-page"
    ) as HTMLElement | null;

    if (printPageElement) {
      // Create a new div to hold the content
      const pdfContentHolder = document.createElement("div");
      pdfContentHolder.appendChild(printPageElement.cloneNode(true));

      // Apply PDF-specific styles to the new div
      pdfContentHolder.classList.add("pdf-styles");

      // Generate PDF using the new div
      html2pdf(pdfContentHolder, {
        margin: 5,
        filename: "snoker_club_receipt.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      });
      // Remove the new div after generating the PDF
      pdfContentHolder.remove();
    }
  };

  const filteredDrink = currentItems.customer.Order.flatMap((order: any) =>
    order.orderItems.filter(
      (orderItem: any) => orderItem.menuItem.category === "DRINK"
    )
  );
  const filteredFood = currentItems.customer.Order.flatMap((order: any) =>
    order.orderItems.filter(
      (orderItem: any) => orderItem.menuItem.category === "FOOD"
    )
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80">
      <div ref={modalRef} className="bg-white p-5 rounded z-50">
        <button onClick={onClose}>
          <X />
        </button>
        <div className="border border-gray-700 p-2 print-page  h-full">
          <div
            className={`border-b-2 border-gray-800 w-${widthPage}rem h-${heightPage}rem`}
          >
            <div className="flex justify-between w-full items-center  mb-1 border-b-8 border-green-600 pb-3">
              <h2 className="flex flex-col justify-center items-center text-2xl font-bold">
                Snoker Club
                <h3>Honar</h3>
              </h2>
              <Image
                src={"/assets/logopng.png"}
                alt="the logo"
                width={60}
                height={60}
              />
            </div>
          </div>
          <div>
            <div className="bg-gray-300 my-1 font-semibold text-[14px] px-1 py-[3px]">
              مشخصات میز
            </div>
            <div className="grid grid-cols-2 border-b border-gray-300">
              <p className="pstyle">نام مشتری</p>
              <span className="spanStyle text-center">
                {currentItems.customer.name}
              </span>
            </div>
            <div className="grid grid-cols-2 border-b border-gray-300">
              <p className="pstyle">زمان شروع بازی</p>
              <span className="spanStyle px-10" dir="ltr">
                {formatDate(currentItems.startTime)}
              </span>
            </div>
            <div className="grid grid-cols-2 border-b border-gray-300">
              <p className="pstyle">زمان پایان بازی</p>
              <span className="spanStyle px-10" dir="ltr">
                {formatDate(currentItems.endTime)}
              </span>
            </div>
            <div className="grid grid-cols-2 border-b border-gray-300">
              <p className="pstyle">مدت زمان</p>
              <span className="spanStyle px-10" dir="ltr">
                {currentItems.duration}دقیقه
              </span>
            </div>
            <div className="grid grid-cols-2 border-b border-gray-300">
              <p className="pstyle">مقدار پول</p>
              <span className="spanStyle px-10" dir="ltr">
                {currentItems.amountEarned}
              </span>
            </div>
          </div>
          <div className="">
            <div className="flex justify-between bg-gray-300">
              <div className=" my-1 font-semibold w-full text-[14px] px-1 py-[1px]">
                مصارف آشپزخانه
              </div>
              <div className=" my-1 font-semibold text-center w-full text-[14px] px-1 py-[1px]">
                نام
              </div>
              <div className=" my-1 font-semibold text-center w-full text-[14px] px-1 py-[1px]">
                تعداد
              </div>
              <div className=" my-1 font-semibold text-center w-full text-[14px] px-1 py-[1px]">
                جمله
              </div>
            </div>
            {filteredFood.length !== 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <tbody>
                  {filteredFood.map((orderItem: any, index: number) => (
                    <tr
                      key={orderItem.id}
                      className="bg-white flex justify-between border-b border-gray-300"
                    >
                      <td className="px-6 text-center pstyle w-full  whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 text-center pstyle w-full  whitespace-nowrap text-sm font-medium text-gray-900">
                        {orderItem.menuItem.name}
                      </td>
                      <td className="px-6 text-center pstyle w-full  whitespace-nowrap text-sm text-gray-500">
                        {filteredDrink[0]?.quantity}
                      </td>
                      <td className="px-6 text-center pstyle w-full  whitespace-nowrap text-sm text-gray-500">
                        {orderItem.menuItem.countStock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="pstyle text-center py-3">مصارف اشپز خانه ندارد</p>
            )}
          </div>
          <div>
            <div className="bg-gray-300 my-1 font-semibold text-[14px] px-1 py-[3px]">
              مصارف کانتین
            </div>
            {filteredDrink.length !== 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <tbody>
                  {filteredDrink.map((orderItem: any, index: number) => (
                    <tr
                      key={orderItem.id}
                      className="bg-white flex justify-between border-b border-gray-300"
                    >
                      <td className="px-6 text-center pstyle w-full  whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 text-center pstyle w-full  whitespace-nowrap text-sm font-medium text-gray-900">
                        {orderItem.menuItem.name}
                      </td>
                      <td className="px-6 text-center pstyle w-full  whitespace-nowrap text-sm text-gray-500">
                        {filteredDrink[0].quantity}
                      </td>
                      <td className="px-6 text-center pstyle w-full  whitespace-nowrap text-sm text-gray-500">
                        {filteredDrink[0].subtotal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="pstyle text-center py-3">مصارف کانتین ندارد</p>
            )}
          </div>

          <div className="flex justify-between bg-green-600 mt-10 h-10 rounded-sm">
            <div className="flex justify-center items-center border-l-2 border-white h-8 my-auto ">
              <span className="rounded-full  w-5 h-5 bg-slate-100 flex justify-center items-center mx-1 ">
                <MapPin size={16} strokeWidth={1.25} />
              </span>
              <span className="text-[10px] text-white mx-2">
                کابل افغانستان، شهر نو، سیتی مارکیت، بلاک 3
              </span>
            </div>

            <div className="flex justify-center items-center mx-2">
              <div className="text-[10px] text-white space-y-1" dir="ltr">
                <p>+93 797 30 30 30</p>
                <p>+93 797 30 30 30</p>
              </div>
              <div className="space-y-1 ">
                <span className="rounded-full  w-4 h-4 bg-white flex justify-center items-center mx-1 ">
                  <Phone size={12} strokeWidth={1.25} className="text-black" />
                </span>
                <span className="rounded-full  w-4 h-4 bg-white flex justify-center items-center mx-1 ">
                  <AiOutlineWhatsApp size={12} strokeWidth={1.25} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-3">
          <Button variant="green" onClick={printToPdf}>
            تائید
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
