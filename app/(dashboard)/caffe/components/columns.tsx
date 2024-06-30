"use client";

import { ColumnDef } from "@tanstack/react-table";

import { labels, priorities, statuses } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="نام" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex justify-center items-center space-x-2">
          {label && <Badge variant="destructive">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.original.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="کتگوری" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex justify-center items-center space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {(row.original.category === "FOOD" && "رستورانت") ||
              (row.original.category === "DRINK" && "کانتین")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="قیمت" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex justify-center items-center space-x-2 text-center">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="w-auto truncate font-medium text-center">
            {row.original.price}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "countStock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="تعداد" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      let textColorClass = ""; // Initialize the text color class

      if (row.original.countStock <= 10) {
        textColorClass = "bg-red-500 rounded-full text-white  "; // Set text color class to "text-danger" for countStock < 10
      } else if (row.original.countStock <= 50) {
        textColorClass = "bg-yellow-500 rounded-full text-white"; // Set text color class to "text-warning" for countStock < 50
      } else if (row.original.countStock > 50) {
        textColorClass = "bg-indigo-500 rounded-full text-white"; // Set text color class to "text-blue" for countStock > 100
      }

      return (
        <div
          className={`flex justify-center items-center space-x-2 ${textColorClass}`}
        >
          {
            <span
              className={cn(textColorClass, " truncate font-medium py-[2px]")}
            >
              {row.original.countStock}
            </span>
          }
        </div>
      );
    },
  },
  {
    accessorKey: "countStock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="عملیات" />
    ),
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
