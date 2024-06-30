"use client";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { DialogFooter } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface ModalProps {
  initialValue?: any;
  name: string;
  row?: any;
  handlePrint: any;
}

const ProductForm: React.FC<ModalProps> = ({ row, name, handlePrint }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuyPriceVisible, setIsBuyPriceVisible] = useState(false); // Added state for visibility
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [amount, setAmount] = useState("");
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    fetch("/api/product")
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const productPrice: any = options.filter(
    (option: any) => option.name == selectedOption
  );
  const handlSubmit = async () => {
    setIsLoading(true);
    await axios
      .post(`/api/product/new/sellProduct`, {
        amount,
        customerName,
        selectedOption /* change this*/,
      })
      .then((res) => {
        if (res.status === 201) {
          handlePrint(
            amount,
            customerName,
            selectedOption,
            productPrice[0].sellPrice
          );
          toast.success("محصول  موفقانه بفروش  رسید");
          setIsOpen(false);
          setIsLoading(false);
          setCustomerName("");
          setAmount("");
          setSelectedOption("");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data);
      });
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
                <h1> فروش محصول</h1>
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
                  name: "",
                  countStock: "",
                }}
                onSubmit={async (values, { resetForm }) => {
                  await handlSubmit();
                  resetForm();
                }}
              >
                {({ values, touched, errors, setFieldValue, resetForm }) => {
                  return (
                    <Form>
                      <div className="flex flex-col space-y-4 gap-1 py-1">
                        <div className="items-center gap-4">
                          <Label htmlFor="name" className="gap-2">
                            انتخاب محصول
                          </Label>
                          <select
                            id="name"
                            name="name"
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            className="w-full h-10 border px-2 border-gray-200 outline-none rounded bg-zinc-100"
                          >
                            <option value="">Select an option</option>
                            {options.map((option: any) => (
                              <option key={option.id} value={option.name}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                          <ErrorMessage
                            name="name"
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
                            value={amount}
                            onChange={(e: any) => setAmount(e.target.value)}
                            className="w-full h-10 border px-2 border-gray-200 outline-none rounded bg-zinc-100"
                          />
                          <ErrorMessage
                            name="countStock"
                            component="div"
                            className="error"
                          />
                        </div>
                        <div className="items-center gap-4">
                          <Label htmlFor="customerName" className="text-right">
                            اسم مشتری
                          </Label>
                          <Field
                            type="text"
                            id="customerName"
                            name="customerName"
                            value={customerName}
                            onChange={(e: any) =>
                              setCustomerName(e.target.value)
                            }
                            className="w-full h-10 border px-2 border-gray-200 outline-none rounded bg-zinc-100"
                          />
                          <ErrorMessage
                            name="customerName"
                            component="div"
                            className="error"
                          />
                        </div>
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

export default ProductForm;
