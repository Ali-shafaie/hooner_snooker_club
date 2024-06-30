"ues client";

import React, { useEffect, useState } from "react";
import {
  DotsHorizontalIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import MenuItem from "./MenuItemForm";
import { Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";
interface DataTableRowActionsProps<TData> {
  row: Row<any>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<any>) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>({});

  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const deleteProduct = useMutation(
    async (id) => {
      const response = await axios.delete(`/api/product/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success("شما موفقانه محصول حذف گردید");
        setIsLoading(false);
      },
      onError: () => {
        toast.error("شما یک مشکل دارید");
        setIsLoading(false);
      },
      onSettled: () => {
        closeDeleteDialog();
      },
    }
  );

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
    closeDropdown();
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleDelete = async (id: any) => {
    setIsDropdownOpen(false);
    setIsLoading(true);
    await deleteProduct.mutateAsync(id);
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
    <div className="inline-block text-right">
      {user?.role === "ADMIN" && (
        <div className="inline-block text-right relative">
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>

          <div className="absolute left-0 -top-10  w-20 rounded-md shadow-lg bg-white ring-1 opacity-0 hover:opacity-100">
            <div className="py-1">
              <MenuItem row={row} name="ویرایش" />
              <button
                onClick={openDeleteDialog}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-[30rem] p-6 rounded-[10px]  shadow-lg">
              <div className="flex  mb-4">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mx-2" />
                <h2 className="text-gray-700  font-semibold">
                  آیا کاملاً مطمعین هستید؟{" "}
                </h2>
              </div>
              <p className="text-zinc-500 text-[13px] text-start px-5">
                این کار باعث می شود دیتا شما برای همیشه از دیتابیس حذف گردد و
                قابل برگشت نمی باشد.
              </p>
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={closeDeleteDialog}
                  className="mx-2 h-8"
                >
                  برگشت
                </Button>
                <Button
                  variant="destructive"
                  className="h-8 text-white rounded bg-rose-600 hover:bg-red-500"
                  onClick={() => handleDelete(row.original.id)}
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
    </div>
  );
}
