"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  tableName: Yup.string().required("انتخاب نام میز الزامی است"),
});

type AddNewPlayerFormProps = {
  tableId: number;
  closeUpdateModal: any;

  tablename: any;
};

const UpdateTable = (props: AddNewPlayerFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
      <Formik
        initialValues={{
          tableName: props.tablename,
          tableId: props.tableId,
        }}
        onSubmit={async (values) => {
          setLoading(true);

          await axios
            .put("/api/tables/updateTable/", values)
            .then((res) => {
              if (res.status === 200) {
                setLoading(false);
                props.closeUpdateModal();
                toast.success("میز فوق موفقانه ویرایش شد. ");
              }
            })
            .catch((error) => {
              setLoading(false);
              props.closeUpdateModal();
              toast.error("مشکلی رخ داد لطفا دوباره امتحان کنید. ");
            });
        }}
        validationSchema={validationSchema}
      >
        {({ values }) => {
          return (
            <Form>
              <div className="flex items-center gap-4">
                <div className="w-full">
                  <label htmlFor="tableName">نام میز</label>
                  <Field
                    name="tableName"
                    id="tableName"
                    placeholder="نام میز"
                    className="flex h-10 mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <ErrorMessage
                    component="div"
                    name="tableName"
                    className="error text-red-500"
                  />
                </div>
              </div>

              <Button className="mt-3 bg-green-500 text-white flex items-center gap-2">
                {loading && <Loader2 className="" />}
                ویرایش میز
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdateTable;
