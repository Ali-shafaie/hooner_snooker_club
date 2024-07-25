"use client";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { startTableSchema } from "@/schemas";
import { createTable } from "@/app/actions/tables/startTable";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface NewTableFormProps {
  onModalClose: any;
}

const NewTableForm: React.FC<NewTableFormProps> = ({ onModalClose }) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const route = useRouter();
  const form = useForm<z.infer<typeof startTableSchema>>({
    resolver: zodResolver(startTableSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof startTableSchema>) => {
    startTransition(() => {
      createTable(values).then((data) => {
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
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">نام میز</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="میز شماره 1"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
