"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Pencil, X } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { DialogFooter } from "@/components/ui/dialog";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("لطفا نام را وارید نماید"),
  price: Yup.string().required("لطفا قمت را وارید نماید"),
});

interface ModalProps {
  initialValue?: any;
}

const MenuItemff: React.FC<ModalProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmitForm = async (e: any, values: any, resetForm: any) => {};
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <main className="w-6xl">
        <div onClick={toggleModal}>
          <Button variant="green" size="sm">
            ایجاد منیو
          </Button>
        </div>

        <div
          className={`fixed inset-0 flex items-center justify-center z-50 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          } transition-opacity duration-300`}>
          <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
          {/* Modal content */}
          <div className="bg-white pt-0 rounded-lg shadow-lg relative z-10 w-[27rem]">
            <div className="bg-green-600 text-white rounded-t-md ">
              <div className="flex p-4 justify-between items-end  ">
                <h1> منیو فورم</h1>
                <button
                  className="mt-4 text-white transition-all ease-linear duration-150 hover:text-green-700 hover:bg-gray-50 px-3 py-1 rounded"
                  onClick={toggleModal}>
                  <X size={20} strokeWidth={1} />
                </button>
              </div>
            </div>
            <div className="p-5">
              <Formik
                initialValues={{
                  name: "",
                  price: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                  setIsLoading(true);
                  await axios
                    .post("/api/menuItem/new", values)
                    .then((res) => {
                      if (res.status === 201) {
                        toast.success("مینو شما موفقانه ثبت گردید");
                        resetForm();
                        setIsLoading(false);
                        router.refresh();
                      }
                    })
                    .catch((error) => {
                      resetForm();
                      setIsLoading(false);
                      setIsOpen(false);
                    });
                }}>
                {({ values, touched, errors, setFieldValue, resetForm }) => {
                  return (
                    <Form>
                      <div className="flex flex-col  space-y-4 gap-1 py-1">
                        <div className="items-center gap-4">
                          <label htmlFor="name" className="my-3">
                            نام
                          </label>
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            className="w-full h-10 border px-2 border-gray-200 outline-none rounded bg-zinc-100"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="error"
                          />
                        </div>
                        <div className="items-center gap-4">
                          <label htmlFor="price" className="text-right">
                            قیمت
                          </label>
                          <Field
                            type="number"
                            id="price"
                            name="price"
                            className="w-full h-10 border px-2 border-gray-200 outline-none rounded bg-zinc-100"
                          />
                          <ErrorMessage
                            name="price"
                            component="div"
                            className="error"
                          />
                        </div>
                        <div className="items-center gap-4">
                          <label htmlFor="category" className="text-right">
                            کتگوری
                          </label>
                          <Field
                            as="select"
                            id="category"
                            name="category"
                            className="w-full h-10 border px-2 border-gray-200 outline-none rounded bg-zinc-100">
                            <option value="">انتخاب کتگوری</option>
                            {/* Add your category options here */}
                            <option value="FOOD">غذا</option>
                            <option value="DRINK">نوشیدنی</option>
                          </Field>
                          <ErrorMessage
                            name="category"
                            component="div"
                            className="error"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          className="mt-5"
                          variant={"green"}
                          disabled={isLoading}
                          onClick={(e) =>
                            handleSubmitForm(e, values, resetForm)
                          }>
                          ذخیره{" "}
                          {isLoading && (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          )}
                        </Button>
                      </DialogFooter>
                    </Form>
                  );
                }}
              </Formik>{" "}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MenuItemff;
