"use client";
import React, { useEffect, useState } from "react";
import NewTableModal from "./components/NewTableModal";
import TableList from "./components/TableList";
import Pagination from "react-js-pagination";
import styles from "./pagination.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ContentLoading from "@/components/content-loading";
import { TablesType } from "@/types/tables";
import { Skeleton } from "@/components/ui/skeleton";

const TablePage = () => {
  const [tables, setTable] = useState<TablesType[]>([]);
  const [menuItem, setMenuItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTables = async () => {
    setIsLoading(true);
    try {
      const data = await fetch("/api/tables", { cache: "no-store" });
      const res = await data.json();
      setIsLoading(false);
      setTable(res);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  useEffect(() => {
    fetchTables();
  }, []);

  const handleRefresh = () => {
    fetchTables(); // Fetch new data and update 'tables'.
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const { data } = await axios.get("/api/menuItem");
        setMenuItem(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchMenuItems();
  }, []);

  // code for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalItems = tables.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const allTables = tables.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  // Sort the data based on the status of table
  const sortedData = allTables.sort((a: any, b: any) => {
    const order: any = { BUSY: 1, BOOKED: 2, FREE: 3 };
    return order[a.status] - order[b.status];
  });
  if (isLoading === true) {
    return (
      <div className="grid md:grid-cols-2 gap-5 h-screen">
        <div className="">
          <div className="flex flex-col space-y-3 items-end">
            <Skeleton className="h-6 w-[140px]" />

            <Skeleton className="h-[500px] w-[550px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[550px]" />
              <Skeleton className="h-4 w-[500px]" />
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col space-y-3 items-end">
            <Skeleton className="h-6 w-[240px]" />
            <Skeleton className="h-[500px] w-[550px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[550px]" />
              <Skeleton className="h-4 w-[500px]" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-[90vh]">
      <div className="flex items-center justify-between mx-4">
        <h1 className="font-semibold text-2xl text-gray-800">لیست میزها</h1>

        <NewTableModal handleRefresh={handleRefresh} />
      </div>

      <div className="mx-4 grid grid-cols-1 md:grid-cols-2 mt-6 gap-x-4 px-3">
        {sortedData.length > 0 &&
          sortedData.map((table: any, index: number) => (
            <div className="" key={index}>
              <TableList
                table={table}
                fetchTables={fetchTables}
                menuItem={menuItem}
              />
            </div>
          ))}
      </div>

      <div className="mt-12 pb-12 ">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalItems}
          pageRangeDisplayed={5} // Number of page links to display
          onChange={handlePageChange}
          itemClass={styles["pagination-button"]}
          activeClass={styles["active-page"]}
          disabledClass={styles["disabled-button"]}
          firstPageText="اول"
          prevPageText="گذشته"
          lastPageText="اخری"
          nextPageText="بعدی"
          innerClass={styles["pagination-inner"]}
        />
      </div>
    </div>
  );
};

export default TablePage;
