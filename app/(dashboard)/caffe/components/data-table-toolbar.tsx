"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./data-table-view-options";

import MenuItem from "./MenuItemForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
}

export function DataTableToolbar<TData>({
  table,
  setSelectedCategory,
  selectedCategory,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [user, setUser] = useState<any>({});

  const { data: session } = useSession();
  const router = useRouter();

  const hanldeFoodCategory = () => {
    setSelectedCategory("FOOD");
    router.push(`/caffe?category=food`);
  };

  const handleDrinkCategory = () => {
    setSelectedCategory("DRINK");
    router.push("/caffe?category=drink");
  };

  const handleAllCategory = () => {
    setSelectedCategory("All");
    router.push("/caffe?category=");
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
    <div className="flex items-center justify-between">
      <div className="flex justify-between w-full items-center space-x-2">
        <div className="flex">
          <Input
            placeholder="جستجو ..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px] outline-1 outline-gray-500 rounded-[5px] border-gray-500 "
          />

          {user?.role === "ADMIN" && <MenuItem name="منیو جدید" />}
        </div>
        <div className="flex ">
          <button
            onClick={() => handleAllCategory()}
            className={`${
              selectedCategory === "All"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700"
            } px-4 py-2 `}
          >
            همه
          </button>
          <button
            onClick={() => hanldeFoodCategory()}
            className={`${
              selectedCategory === "FOOD"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700"
            } px-4 py-2 `}
          >
            رستورانت
          </button>
          <button
            onClick={() => handleDrinkCategory()}
            className={`${
              selectedCategory === "DRINK"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700"
            } px-4 py-2 `}
          >
            کانتین
          </button>
        </div>
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )} */}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
