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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
  Pencil,
  Trash2,
} from "lucide-react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import NewModalEditForm from "./EditForm";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession } from "next-auth/react";

interface TableListProps {
  id: number;
  name: string;
  amount: string;
  expenseDate: string;
  description: number;
  category: string;
  staffs?: any;
}
interface StaffProps {
  staff_id: number;
  name: string;
  staff_name: string;
  job: string;
  salary: number;
  phone: number;
}

interface TabTableListProps {
  currentTable: TableListProps[];
  activeTab: string;
  activeTabCategory: string;
  onClick: () => void;
  updateFetch: () => void;
  staffs?: any;
}

const TabTableList = ({
  onClick,
  currentTable,
  activeTab,
  activeTabCategory,
  staffs,
  updateFetch,
}: TabTableListProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteDialogOpenStaff, setIsDeleteDialogOpenStaff] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [idEmployee, setIdEmployee] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const [user, setUser] = useState<any>({});

  const router = useRouter();
  let total = 0;
  const formatTime = (timeString: any) => {
    const dateTime = new Date(timeString);
    return dateTime.toLocaleString();
  };
  const openDeleteDialog = (id: number) => {
    setIdDelete(id);
    setIdEmployee(id);
    setIsDeleteDialogOpen(true);
  };
  const openDeleteDialogStaff = (id: number) => {
    setIdEmployee(id);
    setIsDeleteDialogOpenStaff(true);
  };
  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const closeDeleteDialogStaff = () => {
    setIsDeleteDialogOpenStaff(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/expense/${idDelete}`);
      toast.success("شما موفقانه مصارف را حذف کردید");
      updateFetch();
      router.refresh();
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast.error("شما در حذف مصارف مشکل دارید");
    }
  };
  const handleDeleteStaff = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/staff/${idEmployee}`);
      toast.success(" شما موفقانه کارمند را حذف کردید");
      setIsLoading(false);
      updateFetch();
      setIsDeleteDialogOpenStaff(false);
      window.location.reload();
    } catch (error) {
      toast.error("شما در حذف کارمند مشکل دارید");
    }
  };

  const tableRef = useRef<HTMLDivElement | null>(null); // Specify the type of the ref

  // Pagination state variables
  const [itemsPerPage, setItemsPerPage] = useState(10); // Updated to use state
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrint = async () => {
    if (tableRef.current) {
      const pdf = new jsPDF("p", "mm", "a4");
      const table = tableRef.current;

      // Hide the elements with class "print-hidden" before taking the snapshot
      const printHiddenElements = table.querySelectorAll(".print-hidden");
      printHiddenElements.forEach((element) => {
        (element as HTMLElement).style.display = "none";
      });

      const canvas = await html2canvas(table);
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 size
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const itemsPerPage = 20; // Define the number of items per page
      const totalPages = Math.ceil(currentItems.length / itemsPerPage);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage(); // Add a new page for the next set of items
        }

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      }
      // Show the hidden elements again
      printHiddenElements.forEach((element) => {
        (element as HTMLElement).style.display = "table-cell";
      });
      pdf.save("spense.pdf");
    }
  };

  const filteredData = currentTable.filter((item: TableListProps) => {
    const expenseDateTime = new Date(item.expenseDate);

    switch (activeTab) {
      case "Today":
        return isToday(expenseDateTime);
      case "Weekly":
        return isThisWeek(expenseDateTime);
      case "Monthly":
        return isThisMonth(expenseDateTime);
      case "Yearly":
        return isThisYear(expenseDateTime);
      default:
        return true;
    }
  });

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [editData, setEditData] = useState<{
    id: number;
    staff_id: number;
    name: string;
    amount: number;
    salary: number;
    phone: number;
    job: string;
    expireDate: number;
    description: string;
    category: string;
    staffs: any;
  } | null>(null);

  const currentItems = filteredData.slice(startIndex, endIndex);
  const handleEditForm = (id: number, item: any) => {
    handleOpenModal();
    setEditData(item);
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
    <div className="px-5 md:px-0">
      <div ref={tableRef}>
        <div className="px-5">
          <h1 className="text-lg my-10 text-center text-gray-700 font-bold">
            گزارشات{" "}
            {activeTab === "Today "
              ? " روزانه"
              : "" || activeTab === "Weekly"
              ? "هفته وار"
              : "" || activeTab === "Monthly"
              ? "ماهانه"
              : "" || activeTab === "Yearly"
              ? "سالانه"
              : ""}
            {/* Assuming the name is the same for all items */}
          </h1>

          {activeTabCategory !== "EMPLOYEE" ? (
            <div>
              <Table className="">
                <TableHeader className="bg-green-600 text-white text-md font-bold rounded-sm">
                  <TableRow className="text-sm text-center">
                    <TableHead className="w-[200px] font-bold">نام </TableHead>
                    <TableHead>کتگوری</TableHead>
                    <TableHead>تاریخ و زمان</TableHead>
                    <TableHead>توضیحات</TableHead>
                    <TableHead>پول</TableHead>
                    {user?.role === "ADMIN" && (
                      <TableHead className="print-hidden">تنظیمات</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody className="border border-gray-300">
                  {currentItems.map((item: TableListProps) => {
                    const itemAmount = parseFloat(item.amount);
                    if (itemAmount) {
                      total += itemAmount;
                    }
                    return (
                      <TableRow
                        key={item.id}
                        className="hover:bg-gray-300 border-b border-gray-300"
                      >
                        <TableCell className="font-bold text-center">
                          {item.name || item.staffs.name}
                        </TableCell>
                        <TableCell>
                          {(item.category === "CAFE" && "کانتین") ||
                            (item.category === "REPAIR" && "تعمیر") ||
                            (item.category === "KITCHEN" && "آشپز خانه") ||
                            (item.category === "ADMINCOST" &&
                              "مصارف عملیاتی") ||
                            (item.category === "ASSETCOST" && "مصارف سرمایه") ||
                            (item.category === "OTHERS" && "سایر")}
                        </TableCell>
                        <TableCell>{formatTime(item.expenseDate)}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        {user?.role === "ADMIN" && (
                          <TableCell className="flex space-x-4 justify-center items-center ">
                            <Trash2
                              onClick={() => openDeleteDialog(item.id)}
                              className="mx-2 hover:text-red-500 transition-all ease-linear duration-300 print-hidden"
                              size={20}
                              strokeWidth={1.25}
                            />

                            <Pencil
                              onClick={() => handleEditForm(item.id, item)}
                              className="mx-2 hover:text-blue-500 transition-all ease-linear duration-300 print-hidden"
                              size={20}
                              strokeWidth={1.25}
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div>
              <Table className="">
                <TableHeader className="bg-green-600 text-white text-md font-bold rounded-sm">
                  <TableRow className="text-sm text-center">
                    <TableHead className="w-[200px] font-bold">نام </TableHead>
                    <TableHead>وظیفه</TableHead>
                    <TableHead>شماره تلفن</TableHead>
                    <TableHead className="print-hidden">تنظیمات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="border border-gray-300">
                  {staffs.map((item: any) => {
                    const itemAmount = item.salary;
                    if (!isNaN(itemAmount)) {
                      total += itemAmount;
                    }
                    return (
                      <TableRow
                        key={item.staff_id}
                        className="hover:bg-gray-300 border-b border-gray-300"
                      >
                        <TableCell
                          className="font-bold text-center hover:text-blue-800 cursor-pointer"
                          onClick={() =>
                            router.push(`/expense/${item.staff_id}`)
                          }
                        >
                          {item.name || item.staffs.name}
                        </TableCell>
                        <TableCell>{item.job}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell className="flex space-x-4 justify-center items-center ">
                          <Trash2
                            onClick={() => openDeleteDialogStaff(item.staff_id)}
                            className="mx-2 hover:text-red-500 transition-all ease-linear duration-300 print-hidden"
                            size={20}
                            strokeWidth={1.25}
                          />

                          <Pencil
                            onClick={() => handleEditForm(item.staff_id, item)}
                            className="mx-2 hover:text-blue-500 transition-all ease-linear duration-300 print-hidden"
                            size={20}
                            strokeWidth={1.25}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center px-5 pb-5">
          <span></span>
          <p className="px-5 py-2">
            مجموع پول :<span className="font-bold">{total}</span>
          </p>
        </div>
      </div>

      {/* Pagination controls */}
      <div className="hidden justify-between items-center px-5  lg:flex">
        <div className="flex items-center justify-center">
          <div className="flex">
            <button
              className="my-5 mx-1"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ChevronsRight />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>آخرین صفحه </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </button>
            <button
              className="my-5 mx-1"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ChevronRight />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>صفحه بعدی</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </button>
          </div>
          <div className="flex mx-5">
            <p>
              صفحه {currentPage} از {totalPages}
            </p>
          </div>
          <div className="flex">
            <button
              className="my-5 mx-1 "
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ChevronLeft />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>صفحه قبلی</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </button>
            <button
              className="my-5 mx-1"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ChevronsLeft />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>اولین صفحه </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </button>
          </div>
        </div>
        {/* Dropdown for items per page */}
        <div className="mb-3 ">
          <div className="flex justify-center items-center my-5">
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
            <Button className="my-5" variant={"green"} onClick={handlePrint}>
              چاپ فورم
            </Button>
          </div>
        </div>
      </div>

      {/* Print button */}

      {isDeleteDialogOpenStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 ">
          <div className="fixed inset-0 flex items-center justify-center z-50 rounded-[5px] ">
            <div className="bg-white w-[30rem] p-6 rounded-[10px] shadow-lg ">
              <div className="flex  mb-4">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mx-2" />
                <h2 className="text-gray-700  font-semibold">
                  آیا کاملاً مطمعین هستید؟{" "}
                </h2>
              </div>
              <p className="text-zinc-500 text-[12px] text-start">
                این کار باعث می شود دیتا شما برای همیشه از دیتابیس حذف گردد و
                قابل برگشت نمی باشد.
              </p>
              <div className="mt-4 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={closeDeleteDialogStaff}
                  className="mx-2 h-8 rounded-[5px]"
                >
                  برگشت
                </Button>
                <Button
                  variant={"destructive"}
                  className="h-8 bg-red-600 px-2 text-white rounded-[5px] hover:bg-red-500"
                  onClick={handleDeleteStaff}
                >
                  تایید{" "}
                  {isLoading && (
                    <Loader2 className="w-5 h-5 mx-2 animate-spin" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 ">
          <div className="fixed inset-0 flex items-center justify-center z-50 rounded-[5px] ">
            <div className="bg-white w-[30rem] p-6 rounded-[10px] shadow-lg ">
              <div className="flex  mb-4">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mx-2" />
                <h2 className="text-gray-700  font-semibold">
                  آیا کاملاً مطمعین هستید؟{" "}
                </h2>
              </div>
              <p className="text-zinc-500 text-[12px] text-start">
                این کار باعث می شود دیتا شما برای همیشه از دیتابیس حذف گردد و
                قابل برگشت نمی باشد.
              </p>
              <div className="mt-4 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={closeDeleteDialog}
                  className="mx-2 h-8 rounded-[5px]"
                >
                  برگشت
                </Button>
                <Button
                  variant={"destructive"}
                  className="h-8 bg-red-600 px-2 text-white rounded-[5px] hover:bg-red-500"
                  onClick={handleDelete}
                >
                  تایید{" "}
                  {isLoading && (
                    <Loader2 className="w-5 h-5 mx-2 animate-spin" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <NewModalEditForm
          editData={editData}
          onClose={handleCloseModal}
          updateFetch={updateFetch}
          activeTabCategory={activeTabCategory}
        />
      )}
    </div>
  );
};

export default TabTableList;
