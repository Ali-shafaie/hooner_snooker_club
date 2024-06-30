"use client";
import { useEffect, useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("لطفا نام تان را وارد کنید. "),
  email: Yup.string()
    .email("لطفا ایمیل درست وارد کنید. ")
    .required("لطفا آدرس ایمیل تان را وارد کنید. "),
  phoneNumber: Yup.string().required("لطفا شماره تماس تان را وارد کنید "),
  address: Yup.string().required("لطفا آدرس تان را وارد کنید"),
  profilePicture: Yup.string().required("لطفا عکس پروفایل تان را انتخاب کنید"),
});

const changePasswordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().required(
    "لطفا رمز ورود فعلی تان را وارد کنید. "
  ),
  newPassword: Yup.string().required("لطفا رمز ورود جدید تان را وارد کنید. "),
  newPasswordRepeat: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "رمز ورود شما مطابقت نکرد. ")
    .required("لطفا رمز ورود جدید تان را تایید کنید. "),
});

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("Tab1");
  const { data: session } = useSession();
  const router = useRouter();

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const handleSave = (e: any) => {
    e.preventDefault();
  };

  // useEffect(() => {
  //   if (!session) {
  //     router.push("auth/signin");
  //   }
  // }, [router, session]);

  return (
    <div className="flex flex-col text-center justify-center">
      <div className="p-4">
        <button
          className={`${
            activeTab === "Tab1" ? "bg-green-600" : "bg-gray-300"
          } text-white px-4 py-2 rounded-md mx-2`}
          onClick={() => handleTabClick("Tab1")}
        >
          تنظیمات پروفایل
        </button>
        <button
          className={`${
            activeTab === "Tab2" ? "bg-green-600" : "bg-gray-300"
          } text-white px-4 py-2 rounded-md`}
          onClick={() => handleTabClick("Tab2")}
        >
          تغیر رمز ورود
        </button>
      </div>
      <div className="p-4">
        {activeTab === "Tab1" && (
          /////////////////////// the profile setting page////////////////////////
          <div className="container mx-auto p-4 h-screen">
            <h1 className="text-2xl font-bold mb-6 ">تنظیمات پروفایل</h1>
            <Formik
              initialValues={{
                name: "",
                email: "",
                phoneNumber: "",
                address: "",
                profilePicture: "",
              }}
              onSubmit={(values) => {}}
              validationSchema={validationSchema}
            >
              <Form className="max-w-md  mx-auto">
                <div className="mb-4 flex flex-col items-start">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    نام
                  </label>
                  <Field
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="name"
                    type="text"
                    placeholder="نام خود را وارد کنید"
                    name="name"
                  />
                  <ErrorMessage name="name" className="error" component="div" />
                </div>
                <div className="mb-4 flex flex-col items-start">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    ایمیل
                  </label>
                  <Field
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="email"
                    type="email"
                    placeholder="ایمیل خود را وارد کنید"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    className="error"
                    component="div"
                  />
                </div>
                <div className="mb-4 flex flex-col items-start">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="phone"
                  >
                    شماره تماس
                  </label>
                  <Field
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="phone"
                    type="text"
                    placeholder="شماره تماس خود را وارد کنید"
                    name="phoneNumber"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    className="error"
                    component="div"
                  />
                </div>
                <div className="mb-4 flex flex-col items-start">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="address"
                  >
                    آدرس
                  </label>
                  <Field
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="address"
                    type="text"
                    placeholder="آدرس خود را وارد کنید"
                    name="address"
                  />
                  <ErrorMessage
                    name="address"
                    className="error"
                    component="div"
                  />
                </div>
                <div className="mb-4 flex flex-col items-start">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="profile-picture"
                  >
                    عکس پروفایل
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="profile-picture"
                    type="file"
                    accept="image/*"
                  />
                  <ErrorMessage
                    name="profilePicture"
                    className="error"
                    component="div"
                  />
                </div>
                <button
                  className=" mt-4 bg-green-600 hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={handleSave}
                >
                  ذخیره
                </button>
              </Form>
            </Formik>
          </div>
        )}
        {activeTab === "Tab2" && (
          /////////////////// the password setting page////////////////////////
          <div className="container mx-auto p-4 pb-16">
            <h1 className="text-2xl font-bold mb-6">تغیر رمز ورود</h1>
            <Formik
              initialValues={{
                currentPassword: "",
                newPassword: "",
                newPasswordRepeat: "",
              }}
              onSubmit={(values) => {}}
              validationSchema={changePasswordValidationSchema}
            >
              <Form className="max-w-md mx-auto">
                <div className="mb-4 flex flex-col items-start">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 "
                    htmlFor="current-password"
                  >
                    رمز ورود فعلی
                  </label>
                  <Field
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="current-password"
                    type="password"
                    placeholder="رمز ورود فعلی خود را وارد کنید"
                    name="currentPassword"
                  />
                  <ErrorMessage
                    name="currentPassword"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="mb-4 flex flex-col items-start">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="new-password"
                  >
                    رمز عبور جدید
                  </label>
                  <Field
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="new-password"
                    type="password"
                    name="newPassword"
                    placeholder="رمز ورود جدید خود را وارد کنید"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="mb-4 flex flex-col items-start">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="confirm-password"
                  >
                    تایید رمز عبور جدید
                  </label>
                  <Field
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="confirm-password"
                    type="password"
                    name="newPasswordRepeat"
                    placeholder="رمز ورود جدید خود را تایید کنید"
                  />
                  <ErrorMessage
                    name="newPasswordRepeat"
                    component="div"
                    className="error"
                  />
                </div>
                <button
                  className="bg-green-600 hover:bg-green-700 w-full mt-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  تغیر رمز ورود
                </button>
              </Form>
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabNavigation;
