"use client";

// Add the necessary imports
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/fa";
import "moment-hijri";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string;
  expenseDate: string;
}

interface StaffMember {
  staff_id: number;
  name: string;
  job: string;
  salary: number;
  phone: number;
  Expenses: Expense[];
  length: any;
}

interface Props {
  params: { id: string };
}

const StaffTabeDetails: React.FC<Props> = ({ params }) => {
  const staffId = parseInt(params.id, 10);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    try {
      axios.get<StaffMember[]>(`/api/staff`).then((res) => {
        const staffList = res.data;
        const filteredStaff = staffList.filter(
          (staff) => staff.staff_id === staffId
        );
        setStaff(filteredStaff);
      });
    } catch (error) {
      console.log("you have some error fetching");
    }
  }, [staffId]);

  const formatToPersianDateTime = (gregorianDateTime: string) => {
    moment.locale("en");
    const hijriDateTime = moment(gregorianDateTime).format(
      "HH:mm:ss، D/MM/YYYY"
    );
    return hijriDateTime;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = staff.map((staffMember) =>
    staffMember.Expenses.slice(indexOfFirstItem, indexOfLastItem)
  )[0];

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="h-screen md:pl-20">
      {staff.map((staffMember) => (
        <div key={staffMember.staff_id}>
          <div className="bg-gray-50 shadow-md-[5px] h-40 flex flex-col justify-between pt-5 rounded-t-[5px]">
            <div className="flex justify-center items-center">
              <h1 className="font-bold text-2xl"> لیست مصارف هر کارمند</h1>
            </div>
            <div className="flex justify-between items-center bg-white h-12 px-5 mx-[1px]">
              <div className="flex justify-center">
                <h1 className="font-bold flex mx-2"> نام کارمند</h1>:
                <h2>{staffMember.name}</h2>
              </div>
              <div className="flex justify-center items-center">
                <h1 className="font-bold flex mx-2">وظیفه </h1>:{" "}
                <h2>{staffMember.job}</h2>
              </div>

              <div className="flex justify-center items-center">
                <h1 className="font-bold flex mx-2">شماره تلفن</h1>:
                <h2>{staffMember.phone}</h2>
              </div>
            </div>
          </div>
          <Table className="container mx-auto border border-gray-300">
            <TableHeader className="bg-green-600">
              <TableRow>
                <TableHead>کتگوری</TableHead>
                <TableHead className="">مقدار پول</TableHead>
                <TableHead>توضیحات</TableHead>
                <TableHead>تاریخ اخذ پول</TableHead>
              </TableRow>
            </TableHeader>

            {currentItems.length !== 0 ? (
              <TableBody>
                {currentItems.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>
                      {expense.category === "ADMINCOST" && "مصارف عملیاتی"}
                    </TableCell>
                    <TableCell>{expense.amount}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>
                      {formatToPersianDateTime(expense.expenseDate)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <div className="text-center p-4 text-gray-500">
                کارمند مصارف دیگر ندارد
              </div>
            )}
          </Table>

          <div className="flex justify-end mt-4">
            <div className="flex space-x-2">
              <select
                className="border rounded px-2 py-1"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
              <button
                className="border rounded px-2 py-1"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                قبلی
              </button>
              <button
                className="border rounded px-2 py-1"
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastItem >= staffMember.Expenses.length}
              >
                بعدی
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffTabeDetails;
