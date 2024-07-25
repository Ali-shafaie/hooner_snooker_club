"use client";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { BookingSchemas } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createnNewBooking } from "@/app/actions/tables/createNewBooking";

interface NewTableFormProps {
  onModalClose: any;
  tableId: string;
}

const NewTableForm: React.FC<NewTableFormProps> = ({
  onModalClose,
  tableId,
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const route = useRouter();

  function getCurrentDateTimeString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const form = useForm<z.infer<typeof BookingSchemas>>({
    resolver: zodResolver(BookingSchemas),
    defaultValues: {
      customerName: "",
      tableId: parseInt(tableId) ?? "",
      amountEarned: 200,
      startTime: getCurrentDateTimeString() || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof BookingSchemas>) => {
    startTransition(() => {
      createnNewBooking(values).then((data) => {
        if (data?.error) {
          toast.error(data.error);
          setError(data.error);
        } else if (data?.success) {
          toast.success(data?.success);
          route.refresh();
          onModalClose();
        }
      });
    });
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          action=""
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">نام مشتری</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder=""
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">تاریخ شروع</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder=""
                        type="datetime-local"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amountEarned"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">مقدار پول</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder=""
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-500 transition-all ease-in-out duration-150  text-white"
              disabled={isPending}
            >
              ثبت
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewTableForm;
