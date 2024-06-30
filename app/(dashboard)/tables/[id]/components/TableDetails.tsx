// TableDetailsPage.tsx
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { isToday, isThisWeek, isThisMonth, isThisYear } from "date-fns";
import Modal from "./PrintModal";
import { format, differenceInMilliseconds } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
interface BookingHistoryItem {
  id: number;
  customer: CustomerType;
  startTime: string;
  endTime: string;
  duration: number;
  amountEarned: number;
}
interface TableListProps {
  currentTable: {
    name: string;
    id: number;
    bookingHistory: BookingHistoryItem[];
    customerType: CustomerType[];
  };
  activeTab: string;
}
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

// Import statements...

const TableDetailsPage: React.FC<TableListProps> = ({
  currentTable,
  activeTab,
}: TableListProps) => {
  let total = 0;
  const formatTime = (timeString: any) => {
    const dateTime = new Date(timeString);
    return dateTime.toLocaleString();
  };

  const tableRef = useRef<HTMLDivElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dataBooking, setDataBooking] = useState<BookingHistoryItem[]>([]);
  const [dataBookingPdf, setDataBookingPdf] = useState<BookingHistoryItem[]>(
    []
  );
  const [user, setUser] = useState<any>({});

  const { data: session } = useSession();

  const handleDetailsClick = (item: any) => {
    setIsModalOpen(true);
    setDataBookingPdf(item);
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

  const handlePrintDetails = (item: any) => {
    setDataBooking(item);
    handlePrint(item);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    // Add logic to save data from the modal
    closeModal();
  };

  const handleDeleteBookingHistory = async (
    customerId: any,
    startTime: any,
    endTime: any
  ) => {
    try {
      const { data } = await axios.post("/api/tables/booking/deleteBooking", {
        tableId: currentTable.id,
        customerId,
        startTime,
        endTime,
      });
      toast.success("بوکینگ موفقانه حذف شد");
      window.location.reload();
    } catch (error) {
      toast.error("ببخشید مشکل پیش شد");
    }
  };

  const filteredBookingHistory = currentTable.bookingHistory.filter(
    (booking: BookingHistoryItem) => {
      const bookingTime = new Date(booking.endTime);
      switch (activeTab) {
        case "Today":
          return isToday(bookingTime);
        case "Weekly":
          return isThisWeek(bookingTime);
        case "Monthly":
          return isThisMonth(bookingTime);
        case "Yearly":
          return isThisYear(bookingTime);
        default:
          return true;
      }
    }
  );

  const totalPages = Math.ceil(filteredBookingHistory.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePrint = (item: any) => {
    const printWindow = window.open("", "_blank");
    const filteredDrink = item.customer?.Order.flatMap((order: any) =>
      order.orderItems.filter(
        (orderItem: any) => orderItem.menuItem.category === "DRINK"
      )
    );

    const filteredFood = item.customer?.Order.flatMap((order: any) =>
      order.orderItems.filter(
        (orderItem: any) => orderItem.menuItem.category === "FOOD"
      )
    );

    const formattedStartTime = format(
      new Date(item.startTime),
      "M/d/yyyy, h:mm:ss a"
    );
    // Parse formatted strings to Date objects
    const startTimeDate = new Date(formattedStartTime);
    const endTimeDate = new Date(item.endTime);
    const formattedEndTime = format(
      new Date(endTimeDate),
      "M/d/yyyy, h:mm:ss a"
    );
    // Calculate the difference in milliseconds
    const timeDifferenceMs = endTimeDate.getTime() - startTimeDate.getTime();

    // Convert the time difference to a human-readable format
    const hours = Math.floor(timeDifferenceMs / (60 * 60 * 1000));
    const minutes = Math.floor(
      (timeDifferenceMs % (60 * 60 * 1000)) / (60 * 1000)
    );

    const timeDifferenceFormatted = `${hours > 0 ? hours : ""}  ${
      hours > 0 ? "ساعت" : ""
    } ${minutes} : دقیقه `;

    let lastOrderItemQuantity = "";
    if (printWindow) {
      let filterDrink = "";
      let totalDrinkSubtotal = 0;
      filteredDrink?.forEach((item: any, index: number) => {
        totalDrinkSubtotal += parseFloat(item.subtotal);

        // Accessing properties from nested objects
        const menuItemName = item.menuItem?.name;

        filterDrink += `
    <tr key=${index}>
      <td>${index + 1}</td>
      <td>${menuItemName}</td>
      <td>${item.quantity}</td>
      <td>${item.subtotal}</td>
    </tr>
  `;
      });

      let tableRows = "";
      let totalFoodSubtotal = 0;
      filteredFood?.length === 0
        ? "مصارف آشپز خانه ندارد"
        : filteredFood?.forEach((item: any, index: number) => {
            totalFoodSubtotal += parseFloat(item.subtotal);
            tableRows += `
        <tr key=${index}>
          <td>${index + 1}</td>
          <td>${item.menuItem?.name}</td>
          <td>${item.menuItem.orderItems[0]?.quantity}</td>
          <td>${item.subtotal}</td>
        </tr>
      `;
          });
      let filterFood = "";
      filteredFood?.forEach((item: any, index: number) => {
        // totalFoodSubtotal = parseFloat(item.subtotal);

        // Accessing properties from nested objects
        const menuItemName = item.menuItem?.name;

        filterFood += `
    <tr key=${index}>
      <td>${index + 1}</td>
      <td>${menuItemName}</td>
      <td>${item.quantity}</td>
      <td>${item.subtotal} </td>
    </tr>
  `;
      });
      const printContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Print Bill</title>
          <style>
     
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
            .header-food{
              background-color:#eee;
              color:"red";
              // margin-top:"100px";
              border-bottom:1px solid black;
              font-weight:bold;
            }
            .data-table {
              width: 100%;
              border-collapse: collapse;
             
            }
            
            .data-table th, .data-table td {
              padding: 4px;
              text-align: center;
              font-size:13px
            }
            
            .data-table tr{
              border-bottom:1px dashed black;
            }
          
            
            .data-table tbody tr:nth-child(even) {
              background-color: #f9f9f9;
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
      <div class="print-title" >${currentTable.name}</div>
      <div class="print-list">
      <div class="span-list">
      <span class="">اسم مشتری : </span>
      <span class="">${item.customer.name}</span>
      </div>
      <div class="span-list">
      <span class="">شروع بازی : </span>
      <span class="" style="font-size:13px" dir="ltr">${formattedStartTime}</span>
      </div>
      <div class="span-list">
      <span class="">ختم  بازی : </span>
      <span class="" style="font-size:13px" dir="ltr">${formattedEndTime}</span>
      </div>
      <div class="span-list">
      <span class="">مدت زمان : </span>
      <span class="" style="font-size:13px" dir="rtl">${timeDifferenceFormatted}</span>
      </div>
      <div class="span-list">
      <span class="">مقدار پول : </span>
      <span class="" style="font-size:13px" dir="ltr">${
        item.amountEarned
      }</span>
      </div>
      
    
    </br>
      <div class="header-food">
     مصارف آشپزخانه      
      </div>
      <table class="data-table">
      <thead>
        <tr>
          <th>شماره</th>
          <th>نام</th>
          <th>تعداد</th>
          <th>مجموع</th>
        </tr>
      </thead>
      <tbody>
${filterFood}
      </tbody>
    </table>
    </br>
    <div class="header-food">
   مصارف کانتین      
    </div>
    <table class="data-table">
    <thead>
      <tr>
        <th>شماره</th>
        <th>نام</th>
        <th>تعداد</th>
        <th>جمله</th>
      </tr>
    </thead>
    <tbody>
      
      ${filterDrink}
    </tbody>
  </table>
  </br>
  <div class="header-food">
   <span>جمله پول  </span><span>${
     totalDrinkSubtotal + totalFoodSubtotal + item.amountEarned
   }</span>   
    </div>
    ${lastOrderItemQuantity}
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

  return (
    <div className="md:px-5 px-1 overflow-x-scroll max-w-[355px] md:max-w-full">
      <div ref={tableRef}>
        <div className="md:px-5">
          <h1 className="text-lg mt-3 mb-7 md:my-10 text-center text-gray-700 font-bold">
            گزارشات {currentTable.name}
          </h1>

          <Table>
            <TableHeader className="bg-green-600 text-white text-md font-bold rounded-sm">
              <TableRow className="text-sm text-center">
                <TableHead className="w-[200px] font-bold">نام مشتری</TableHead>
                <TableHead>زمان شروع بازی</TableHead>
                <TableHead>زمان ختم بازی</TableHead>
                {/* <TableHead>مدت زمان</TableHead> */}
                <TableHead>پول</TableHead>
                <TableHead className="hidden md:block mt-5">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border border-gray-300">
              {filteredBookingHistory
                .slice(startIndex, endIndex)
                .map((item: BookingHistoryItem) => {
                  total += item.amountEarned;

                  return (
                    <TableRow
                      key={item.id}
                      className="hover:bg-gray-300 border-b border-gray-300"
                    >
                      <TableCell className="font-medium text-center">
                        {item.customer?.name}
                      </TableCell>
                      <TableCell>{formatTime(item.startTime)}</TableCell>
                      <TableCell>{formatTime(item.endTime)}</TableCell>
                      {/* <TableCell>{item.duration} دقیقه</TableCell> */}
                      <TableCell>{item.amountEarned}</TableCell>
                      <TableCell className="hover:text-blue-500 hidden md:block cursor-pointer">
                        <Button
                          onClick={() => handleDetailsClick(item)}
                          variant={"outline"}
                        >
                          PDF
                        </Button>
                        <Button
                          onClick={() => handlePrintDetails(item)}
                          variant={"outline"}
                          className="mx-2"
                        >
                          چاپ بیل
                        </Button>
                        {user?.role === "ADMIN" && (
                          <Button
                            onClick={() =>
                              handleDeleteBookingHistory(
                                item.customer?.id,
                                item.startTime,
                                item.endTime
                              )
                            }
                            variant={"outline"}
                            className="mx-2"
                          >
                            حذف
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between items-center px-5 pb-5">
          <span></span>
          <p className="md:px-4 mt-2">
            مجموع پول :<span className="font-bold">{total}</span>
          </p>
        </div>
      </div>

      {/* Pagination controls */}
      <div className="flex flex-col md:flex-row justify-between items-center px-5">
        <div>
          <Button
            className="my-5 mx-1"
            variant={"green"}
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            اولین صفحه
          </Button>
          <Button
            className="my-5 mx-1"
            variant={"green"}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            صفحه قبلی
          </Button>
        </div>
        <div>
          <p>
            صفحه {currentPage} از {totalPages}
          </p>
        </div>
        <div>
          <Button
            className="my-5 mx-1"
            variant={"green"}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            صفحه بعدی
          </Button>
          <Button
            className="my-5 mx-1"
            variant={"green"}
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            آخرین صفحه
          </Button>
        </div>
        {/* Dropdown for items per page */}
        <div className="mb-3">
          <label htmlFor="itemsPerPage">نمایش تعداد:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="ml-2 border rounded px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Print button */}
      <div className="flex justify-center my-5">
        <Button className="my-5" variant={"green"}>
          چاپ
        </Button>
      </div>

      {isModalOpen && (
        <Modal
          onClose={closeModal}
          currentItems={dataBookingPdf}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default TableDetailsPage;
