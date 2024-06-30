"use client";

import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomSimpleSelect from "@/components/CustomSimpleSelect";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import AddOrder from "./AddOrder";

const validationSchema = Yup.object().shape({
  customerName: Yup.string().required("انتخاب نام مشتری الزامی است"),
  startTime: Yup.date().required("لطفا زمان شروع بازی را مشخص کنید. "),
  amountEarned: Yup.number()
    .required("انتخاب هزینه الزامی است")
    .min(0, "هزینه باید بلندتر از صفر انتخاب شود"),
});

type AddOrderModalProps = {
  closeModal: any;
};

type InputItem = {
  name: string;
  quantity: string;
};

const AddOrderModal = (props: AddOrderModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [values, setValues] = useState<any>([]);
  const [menuItem, setMenuItem] = useState([]);

  console.log("kho khay ", values);

  const openOrderModal = () => {
    setIsOrderModalOpen(true);
  };
  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  function getCurrentDateTimeString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get("/api/tables")
      .then((response) => {
        setOptions(response.data); // Assuming the API returns an array of options
      })
      .catch((error) => {
        console.error("Error fetching options from the API:", error);
      });
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const { data } = await axios.get("/api/menuItem");
        setMenuItem(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchMenuItems();
  }, []);

  // LOGIC FROM HERE
  const [inputList, setInputList] = useState<InputItem[]>([
    { name: "", quantity: "" },
  ]);
  const [filteredItems, setFilteredItems] = useState<any>([]);

  // handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const list: InputItem[] = [...inputList];
    list[index] = { ...list[index], [name]: value }; // Ensure TypeScript knows that 'name' is a property of InputItem
    setInputList(list);

    // Filter items based on the updated inputList
    const filteredArray = menuItem.filter((item1: any) =>
      list.some((item2) => item2.name === item1.name)
    );
    setFilteredItems(filteredArray);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button cuz its going to have the very best things
  const handleAddClick = () => {
    setInputList([...inputList, { name: "", quantity: "" }]);
  };

  // const handleSubmit = async () => {
  //   setLoading(true);

  //   await axios
  //     .post("/api/tables/order/new/otherTables", {
  //       data: {
  //         inputValue: inputList,
  //         filteredItems: filteredItems,
  //         tableId: values.tableId,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.status === 201) {
  //         setLoading(false);
  //         toast.success("آردر فوق موفقانه رزرو شد. ");
  //       }
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       console.log("error message", error);

  //       toast.error(error.response.data);
  //     });
  // };
  // UPTO HERE

  return (
    <div>
      <Formik
        initialValues={{
          customerName: "",
          startTime: getCurrentDateTimeString() || "",
          amountEarned: "",
          endTime: getCurrentDateTimeString() || "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          setValues(values);

          await axios
            .post("/api/tables/booking/new/otherBooking", {
              data: { values, inputList, filteredItems },
            })
            .then((res) => {
              if (res.status === 201) {
                setLoading(false);
                props.closeModal();

                toast.success("میز فوق موفقانه رزرو شد. ");
              }
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              toast.error("مشکلی رخ داد لطفا دوباره امتحان کنید. ");
            });
        }}
        validationSchema={validationSchema}
      >
        {({ values }) => {
          return (
            <Form className="flex flex-col">
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4 pb-4">
                <div className="flex-1">
                  <label htmlFor="tableId">انتخاب میز </label>
                  <Field
                    as="select"
                    name="tableId"
                    className="flex h-10 mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">انتخاب میز</option>

                    {options.map((option: any) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="flex-1">
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

              <div className="flex flex-col md:flex-row items-center gap-4 mt-2 pb-4">
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
                  <label htmlFor="endTime">زمان ختم بازی</label>
                  <Field
                    name="endTime"
                    id="endTime"
                    type="datetime-local"
                    className="flex h-10 mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <ErrorMessage
                    component="div"
                    name="endTime"
                    className="error"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="w-full">
                  <label htmlFor="amountEarned"> هزینه بازی فی ساعت</label>
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
              <div className="App max-h-[250px] mt-5 overflow-y-auto">
                {inputList.map((x, i) => {
                  const max =
                    filteredItems &&
                    filteredItems.filter((item: any) => item.name === x.name);
                  const realmax = max.length > 0 && max[0].countStock;

                  return (
                    <>
                      <div className="box flex flex-row md:block " key={i}>
                        <select
                          className="border rounded py-2 px-5 mr-2 w-[140px] md:w-[200px]"
                          name="name"
                          value={x.name}
                          onChange={(e) => handleInputChange(e, i)}
                        >
                          <option value="" disabled>
                            انتخاب فرمایش
                          </option>
                          {menuItem.map((option: any, index: any) => (
                            <option key={index} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                        <input
                          className="border rounded py-[10px] mt-1 text-center w-[90px] md:w-[150px] mr-4"
                          name="quantity"
                          placeholder="مقدار"
                          value={x.quantity}
                          type="number"
                          max={realmax} // this should be the maximum number of countStock of an item
                          min={1}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                        <button
                          className="bg-red-500 hover:bg-red-600 text-sm mt-2 text-white py-2 px-2 rounded mr-4"
                          onClick={() => handleRemoveClick(i)}
                        >
                          <div className="flex items-center justify-center">
                            <Trash2 color="#fff" size={17} />
                          </div>
                        </button>
                      </div>
                      <div className="btn-box block">
                        {inputList.length - 1 === i && (
                          <button
                            className=" mt-3 text-white py-2 px-3 rounded"
                            onClick={handleAddClick}
                          >
                            <PlusCircle color="#0ec475" />
                          </button>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="flex justify-between">
                <Button className="mt-4 flex items-center w-full gap-2 text-white bg-green-500 text-lg">
                  ذخیره
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

export default AddOrderModal;
