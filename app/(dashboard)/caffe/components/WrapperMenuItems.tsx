"use client";

import React, { useState } from "react";
import { DataTable } from "./data-table";
import { MenuItem } from "@/types/menuItem";
import { columns } from "./columns";
interface WrapperMenuItemsProps {
  menuItems: MenuItem[];
}
const WrapperMenuItems: React.FC<WrapperMenuItemsProps> = ({ menuItems }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter menu items based on selected category
  const filteredMenuItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item: any) => item.category === selectedCategory);

  return (
    <main className="">
      <div className="container mx-auto p-5 ">
        <div className="md:hidden">
          شما نمی توانید دیتا تیبل خود را در حالت موبایل ببینید
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">خوش آمدید !</h2>
              <p className="text-muted-foreground text-sm">
                این لیست از منیو های شما میباشد
              </p>
            </div>
          </div>
          {!menuItems ? (
            <p className="w-full flex h-full place-content-center items-center">
              Loading...
            </p>
          ) : (
            <DataTable
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              data={filteredMenuItems}
              columns={columns}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default WrapperMenuItems;
