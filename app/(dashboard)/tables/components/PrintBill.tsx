import Image from "next/image";
import React from "react";

interface PrintBillProps {
  table: any;
}
const PrintBill = (props: PrintBillProps) => {
  function print(e: any) {
    e.preventDefault();
    // Your print logic here
    window.print();
  }

  // Assuming props.table.bookingHistory[props.table.bookingHistory.length - 1].startTime is a string
  const startTimeString =
    props.table.bookingHistory[props.table.bookingHistory.length - 1].startTime;

  // Convert the string to a Date object
  const startTimeDate = new Date(startTimeString);

  // Extract year, month, day, and time
  const year = startTimeDate.getFullYear();
  const month = (startTimeDate.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based, so add 1
  const day = startTimeDate.getDate().toString().padStart(2, "0");
  let hours = startTimeDate.getHours();
  const minutes = startTimeDate.getMinutes().toString().padStart(2, "0");
  let ampm = "AM";

  // Convert to 12-hour format and determine AM/PM
  if (hours >= 12) {
    ampm = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }

  // Format the date and time as a single string
  const formattedDateTime = `${year}/${month}/${day} ${hours}:${minutes} ${ampm}`;

  return (
    <div className=" py-5" style={{ width: "3in" }} onClick={print}>
      <div className="flex flex-col justify-center items-center ">
        <Image
          src={"/assets/logopng.png"}
          alt="the logo"
          width={50}
          height={50}
        />
        <h2 className="text-center py-2"> هنر سنوکر کلپ</h2>
      </div>
      <div className="flex items-center space-x-5 mx-10 pt-4 border-b border-dashed border-gray-300">
        <span className="flex  mx-[10px]  text-[14px]">نمبر میز : </span>
        <span className="text-[12px] pt-1">{props.table.name}</span>
      </div>
      <div className="flex items-center space-x-5 mx-10 pt-2 border-b border-dashed border-gray-300">
        <span className="flex  mx-[10px] text-[14px] whitespace-nowrap ">
          اسم مشتری :{" "}
        </span>
        <span className="text-[12px] pt-1 mr-[40px] whitespace-nowrap">
          {" "}
          {
            props.table.bookingHistory[props.table.bookingHistory.length - 1]
              .customer.name
          }
        </span>
      </div>{" "}
      <div className="flex items-center  mx-10 pt-2 border-b border-dashed border-gray-300">
        <span className="flex  mx-[5px] text-[14px] whitespace-nowrap">
          شروع بازی :
        </span>
        <span className="text-[12px] pt-1 whitespace-nowrap">
          {formattedDateTime}
        </span>
      </div>{" "}
      <div className="flex justify-between items-center  mx-10 pt-2 my-10 border-t border-dashed border-gray-300">
        <span className="text-[12px] pt-1">989</span>
        <span className="flex  mx-[5px] text-[14px]">محل امضاء </span>
      </div>{" "}
    </div>
  );
};

export default PrintBill;
