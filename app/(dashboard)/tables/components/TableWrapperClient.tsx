"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TablesType } from "@/types/tables";
import { Skeleton } from "@/components/ui/skeleton";
import TableList from "./TableList";
import NewTableModal from "./NewTableModal";

interface Props {
  tablelist: TablesType[];
  menuItem: any;
}

const TableWrapperClient: React.FC<Props> = ({ tablelist, menuItem }) => {
  // Sort the data based on the status of table
  //   const sortedData = allTables.sort((a: any, b: any) => {
  //     const order: any = { BUSY: 1, BOOKED: 2, FREE: 3 };
  //     return order[a.status] - order[b.status];
  //   });

  if (!tablelist) {
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

        <NewTableModal />
      </div>

      <div className="mx-4 grid grid-cols-1 md:grid-cols-2 mt-6 gap-x-4 px-3">
        {tablelist.map((table: any, index: number) => (
          <div className="" key={index}>
            <TableList table={table} menuItem={menuItem} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableWrapperClient;
