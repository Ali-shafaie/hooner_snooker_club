"use client";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";

const frameworks = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "user",
    label: "User",
  },
];

const validationSchema = Yup.object({
  email: Yup.string()
    .email("لطفا ایمیل آدرس درست وارد کنید. ")
    .required("آدرس ایمیل الزامی می باشد. "),
  username: Yup.string().required("لطفا نام کاربری را وارد کنید. "),
  password: Yup.string()
    .min(6, "رمز ورود باید حداقل 6 کرکتر باشد. ")
    .required("لطفا رمز ورود را وارد کنید. "),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "رمز ورود با هم مطابقت نمیکند. ")
    .required("لطفا رمز ورود وارد شده را تایید کنید. "),
  role: Yup.string().required("لطفا نقش کاربر را مشخص کنید. "),
});

const RegisterUSer = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <div className="h-[90vh]  text-center">
      <h2 className="font-bold text-xl mb-6 ml-4">ثبت کاربر</h2>

      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
          role: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            setLoading(true);
            const res = await axios.post("/api/users/new", values);

            if (res.status === 201) {
              toast.success("حساب کاربری موفقانه ایجاد شد.");
              resetForm();
              setLoading(false);
            }
          } catch (error) {
            toast.error("مشکل رخ داد. لطفا چک کرده و دوباره امتحان کنید.");
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="flex items-center justify-center">
          <Form className="w-72">
            <div className="mb-4 flex flex-col items-start">
              <label
                htmlFor="email"
                className="mb-2 text-sm font-medium text-gray-900 "
              >
                ایمیل:{" "}
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className=" border shadow-sm bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 "
                placeholder="info@gmail.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4 flex flex-col items-start">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                نام کاربری:{" "}
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className="border  shadow-sm bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 "
                placeholder="username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4 flex flex-col items-start">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                رمز عبور:{" "}
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="border shadow-sm bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 "
                placeholder="*********"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4 flex flex-col items-start">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                تایید رمز عبور:{" "}
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="border shadow-sm bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 "
                placeholder="*********"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4 flex flex-col items-start">
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                نقش کاربر:{" "}
              </label>

              <Field name="role">
                {({ field, form }: { field: any; form: any }) => (
                  <CustomSelect
                    items={frameworks}
                    field={field}
                    form={form}
                    selectFor="نقش"
                  />
                )}
              </Field>

              <ErrorMessage
                name="role"
                component="div"
                className="text-red-500"
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white mx-auto w-full px-32 py-2 hover:bg-green-600 flex items-center gap-3 border rounded-md"
            >
              ثبت
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            </button>
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default RegisterUSer;
