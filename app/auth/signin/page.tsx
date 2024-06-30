"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("لطفا آدرس ایمیل درست وارد کنید. ")
    .required("لطفا ایمیل آدرس تان را وارد کنید. "),
  password: Yup.string().required("لطفا رمز ورود تان را وارد کنید. "),
});

const LoginPage = () => {
  const [isMount, setIsMount] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    setIsMount(true);
  }, []);
  useEffect(() => {
    if (session && session.user) {
      router.push("/");
    }
  }, [session, router]);

  if (!isMount) {
    return null;
  }
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src={"/assets/Bg.jpg"}
          alt="The background image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 ">
        <div className=" w-full bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
              به حساب خود وارد شوید
            </h1>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                const { email, password } = values;
                setLoading(true);
                try {
                  const res = await signIn("credentials", {
                    email,
                    password,
                    callbackUrl: "/",
                    redirect: false,
                  });

                  if (res?.error === null) {
                    router.push("/");
                    toast.success("ورود به سیستم موفقانه انجام شد.");
                  } else {
                    toast.error("ایمیل یا رمز ورود شما اشتباه است. ");
                  }
                } catch (error) {
                } finally {
                  setLoading(false);
                }
              }}
            >
              <Form>
                <div className="mb-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                      ایمیل آدرس شما
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="آدرس ایمیل"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                      رمز عبور
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      placeholder="رمز ورود"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center text-white pb-4">
                  <span
                    className="hover:text-gray-900 cursor-pointer text-[12px]"
                    onClick={() => router.push("/password/forgot")}
                  >
                    آیا شما رمز ورود تان را فراموش کرده اید؟
                  </span>
                  <div className="flex justify-center items-center">
                    <span className="mx-2 text-[12px]">مرا بخاطر بسپار</span>
                    <Checkbox />
                  </div>
                </div>

                <Button className="text-white">
                  ورود به سیستم
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                </Button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
