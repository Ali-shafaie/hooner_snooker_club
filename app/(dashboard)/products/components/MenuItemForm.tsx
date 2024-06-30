import { Button } from "@/components/ui/button";
import { Loader2, Pencil, X } from "lucide-react";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { DialogFooter } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("لطفا نام را وارید نماید"),

  price: Yup.number()
    .required("لطفا قمت را وارید نماید")
    .positive("قیمت باید مثبت باشد.")
    .integer("لطفا قیمت عدد وارید نماید"),

  // category: Yup.string().required("لطفا کتگوری را را نتخاب نماید"),

  countStock: Yup.number()
    .required("لطفا تعداد را وارید نماید")
    .positive("قیمت باید مثبت باشد.")
    .integer("لطفا قیمت عدد وارید نماید"),
});

interface ModalProps {
  initialValue?: any;
  name: string;
  row?: any;
}

const MenuItem: React.FC<ModalProps> = ({ row, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuyPriceVisible, setIsBuyPriceVisible] = useState(false); // Added state for visibility

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <main className="">
        <div>
          {row ? (
            <span
              className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              onClick={toggleModal}
            >
              {name}
            </span>
          ) : (
            <Button
              onClick={toggleModal}
              variant="green"
              size="sm"
              className="h-8 border-dashed mx-1 items-center"
            >
              {name}
            </Button>
          )}
        </div>

        <div
          className={`fixed  inset-0 flex items-center justify-center z-50 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          } transition-opacity duration-300`}
        >
          <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
          {/* Modal content */}
          <div className="bg-white pt-0 rounded-[10px] shadow-lg relative z-10 w-full md:w-[34rem]">
            <div className="bg-green-600 text-white rounded-t-[8px] ">
              <div className="flex p-4 justify-between items-end  ">
                <h1> ایجاد محصول</h1>
                <button
                  className="mt-4 text-white transition-all ease-linear duration-150 hover:text-green-700 hover:bg-gray-50 px-3 py-1 rounded"
                  onClick={toggleModal}
                >
                  <X size={20} strokeWidth={1} />
                </button>
              </div>
            </div>
            <div className="p-5">
              <Formik
                initialValues={{
                  name: row?.original.name ?? "",
                  // buyPrice: row?.original.buyPrice ?? "",
                  price: row?.original.price ?? "",
                  // category: row?.original.category ?? "",
                  countStock: row?.original.countStock ?? "",
                }}
                // validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                  setIsLoading(true);
                  if (row) {
                    await axios
                      .patch(`/api/product/${row.original.id}`, values)
                      .then((res) => {
                        if (res.status === 200) {
                          toast.success("محصول موفقانه ویرایش گردید");
                          window.location.reload();
                          resetForm();
                          setIsOpen(false);
                          setIsLoading(false);
                        }
                      })
                      .catch((error) => {
                        resetForm();
                        setIsLoading(false);
                        setIsOpen(false);
                      });
                  } else {
                    await axios
                      .post(`/api/product/new`, values)
                      .then((res) => {
                        if (res.status === 201) {
                          toast.success("محصول جدید موفقانه اظافه گردید");
                          resetForm();
                          setIsOpen(false);
                          setIsLoading(false);
                        }
                      })
                      .catch((error) => {
                        resetForm();
                        setIsLoading(false);
                        setIsOpen(false);
                      });
                  }
                }}
              >
                {({ values, touched, errors, setFieldValue, resetForm }) => {
                  return (
                    <Form>
                      <div className="flex flex-col space-y-4 gap-1 py-1">
                        <div className="items-center gap-4">
                          <Label htmlFor="name" className="gap-2">
                            نام محصول
                          </Label>
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
                          <Label htmlFor="buyPrice" className="text-right">
                            قیمت خرید
                          </Label>
                          <Field
                            type="number"
                            id="buyPrice"
                            name="buyPrice"
                            className="w-full h-10 border px-2 border-gray-200 outline-none rounded bg-zinc-100"
                          />
                          <ErrorMessage
                            name="buyPrice"
                            component="div"
                            className="error"
                          />
                        </div>

                        <div className="items-center gap-4">
                          <Label htmlFor="sellPrice" className="text-right">
                            قیمت فروش
                          </Label>
                          <Field
                            type="number"
                            id="sellPrice"
                            name="sellPrice"
                            className="w-full h-10 border px-2 border-gray-200 outline-none rounded bg-zinc-100"
                          />
                          <ErrorMessage
                            name="sellPrice"
                            component="div"
                            className="error"
                          />
                        </div>
                        <div className="items-center gap-4">
                          <Label htmlFor="countStock" className="text-right">
                            تعداد
                          </Label>
                          <Field
                            type="number"
                            id="countStock"
                            name="countStock"
                            className="w-full h-10 border px-2 border-gray-200 outline-none rounded bg-zinc-100"
                          />
                          <ErrorMessage
                            name="countStock"
                            component="div"
                            className="error"
                          />
                        </div>
                        {/* <div className="items-center gap-4">
                          <Label htmlFor="category" className="text-right">
                            کتگوری
                          </Label>
                          <Field
                            as="select"
                            id="category"
                            name="category"
                            className="w-full h-10 border px-2 border-gray-200 outline-none rounded bg-zinc-100"
                            onChange={(e: any) => {
                              setFieldValue("category", e.target.value);
                              setFieldValue("buyPrice", ""); // Reset buyPrice when category changes
                              setIsBuyPriceVisible(e.target.value === "DRINK");
                            }}
                          >
                            <option value="">انتخاب کتگوری</option>
                            <option value="FOOD">غذا</option>
                            <option value="DRINK">نوشیدنی</option>
                          </Field>
                          <ErrorMessage
                            name="category"
                            component="div"
                            className="error"
                          />
                        </div> */}
                        {/* {isBuyPriceVisible && (
                          <div className="items-center gap-4">
                            <Label htmlFor="buyPrice" className="text-right">
                              قیمت خرید
                            </Label>
                            <Field
                              type="number"
                              id="buyPrice"
                              name="buyPrice"
                              className="w-full h-10 border px-2 border-gray-200 outline-none rounded bg-zinc-100"
                            />
                            <ErrorMessage
                              name="buyPrice"
                              component="div"
                              className="error"
                            />
                          </div>
                        )} */}
                      </div>
                      <DialogFooter>
                        <Button
                          className="mt-5"
                          variant={"green"}
                          // disabled={disable}
                        >
                          ذخیره
                          {isLoading && (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          )}
                        </Button>
                      </DialogFooter>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MenuItem;
