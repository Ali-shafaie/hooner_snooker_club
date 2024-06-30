"use client";

import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomSimpleSelect from "@/components/CustomSimpleSelect";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  customerName: Yup.string().required("انتخاب نام مشتری الزامی است"),
  startTime: Yup.date().required("لطفا زمان شروع بازی را مشخص کنید. "),
  amountEarned: Yup.number()
    .required("انتخاب هزینه الزامی است")
    .min(0, "هزینه باید بلندتر از صفر انتخاب شود"),
  // duration: Yup.string().required("انتخاب مقدار زمان الزامی است"),
});

type AddNewPlayerFormProps = {
  tableId: number;
  closeModal: any;
  updateState: any;
};

const AddNewPlayerForm = (props: AddNewPlayerFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  function getCurrentDateTimeString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  return (
    <div>
      <Formik
        initialValues={{
          customerName: "",
          startTime: getCurrentDateTimeString() || "",
          // endTime: "",
          // duration: "",
          amountEarned: "",
          tableId: props.tableId,
        }}
        onSubmit={async (values) => {
          setLoading(true);

          await axios
            .post("/api/tables/booking/new", values)
            .then((res) => {
              if (res.status === 201) {
                setLoading(false);
                props.closeModal();

                props.updateState();
                toast.success("میز فوق موفقانه رزرو شد. ");
              }
            })
            .catch((error) => {
              setLoading(false);
              toast.error("مشکلی رخ داد لطفا دوباره امتحان کنید. ");
            });
        }}
        validationSchema={validationSchema}>
        {({ values }) => {
          return (
            <Form className="flex flex-col">
              <div className="flex items-center gap-4">
                <div className="w-full">
                  <label htmlFor="customerName">نام مشتری</label>
                  <Field
                    name="customerName"
                    id="customerName"
                    placeholder="نام مشتری"
                    className="flex h-10 mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <ErrorMessage
                    component="div"
                    name="customerName"
                    className="error text-red-500"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="w-full">
                  <label htmlFor="startTime">زمان شروع بازی</label>
                  <Field
                    name="startTime"
                    id="startTime"
                    type="datetime-local"
                    className="flex h-10 mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <ErrorMessage
                    component="div"
                    name="startTime"
                    className="error"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="startTime"> هزینه بازی فی ساعت</label>
                  <Field
                    name="amountEarned"
                    id="amountEarned"
                    type="number"
                    className="flex h-10 mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <ErrorMessage
                    component="div"
                    name="amountEarned"
                    className="error text-red-500"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button className="mt-4 flex items-center w-full gap-2 text-white bg-green-500">
                  شروع
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddNewPlayerForm;
