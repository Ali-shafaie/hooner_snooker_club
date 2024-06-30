import prisma from "@/app/libs/prismadb";
import { Request, Response } from "express"; // Assuming you are using Express
import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Diff, Loader2, PlusCircle, Trash2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

type saveOrderProps = {
  tableId: number;
  closeOrderModal: any;
  updateState: any;
  tablename: any;
  items: any;
};

type InputItem = {
  name: string;
  quantity: string;
};

const SaveOrder = (props: saveOrderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allitem, setItems] = useState<Array<any>>(props.items);
  const [orders, setOrders] = useState<any>([]);
  const [booking, setBooking] = useState();

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
    const filteredArray = allitem.filter((item1: any) =>
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

  const handleSubmit = async () => {
    setLoading(true);

    await axios
      .post("/api/tables/order/new", {
        data: {
          inputValue: inputList,
          filteredItems: filteredItems,
          existedOrders: orders,
          tableId: props.tableId,
          customerId: booking,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          props.closeOrderModal();
          setLoading(false);
          toast.success("آردر فوق موفقانه رزرو شد. ");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error message", error);

        toast.error(error.response.data);
      });
  };

  useEffect(() => {
    const fetchBooking = async () => {
      const { data } = await axios.post(
        "/api/tables/booking/fetchSingleBooking",
        {
          tableId: props.tableId,
        }
      );
      setBooking(data);
    };
    const fetchOrder = async () => {
      const { data } = await axios.post("/api/tables/order/findOrder", {
        tableId: props.tableId,
        customerId: booking,
      });
      setOrders(data);
    };

    fetchBooking();
    if (booking) {
      fetchOrder();
    }
  }, [props.tableId, booking]);

  const handleInputChange2 = (e: any, index: any) => {
    const { name, value } = e.target;

    // Create a copy of the orders object
    const updatedOrders: any = { ...orders };
    setOrders(updatedOrders);

    // Check if the key 'orderItems' exists in 'updatedOrders' and if it's an array
    if (
      updatedOrders.hasOwnProperty("orderItems") &&
      Array.isArray(updatedOrders.orderItems)
    ) {
      // Create a copy of the specific order item being modified
      const updatedOrderItem = { ...updatedOrders.orderItems[index] };

      if (name === "name") {
        // Update the 'name' property of the specific order item
        // updatedOrderItem.menuItem.name = value;
      } else if (name === "quantity") {
        // Update the 'quantity' property of the specific order item
        updatedOrderItem.quantity = value;
      }

      // Update the specific order item in the 'orderItems' array
      updatedOrders.orderItems[index] = updatedOrderItem;
    }

    // Set the updated 'orders' object in the state
    setOrders(updatedOrders);
  };

  return (
    <div className="App">
      <div className="max-h-[450px] overflow-y-auto">
        <div>
          {orders && Array.isArray(orders.orderItems) ? (
            orders.orderItems.map((order: any, i: any) => (
              <div key={order.id}>
                <select
                  className="border rounded py-2 px-5 mr-2 w-[140px] md:w-[200px]"
                  name="name"
                  value={order.menuItem.name}
                  onChange={(e) => handleInputChange2(e, i)}
                >
                  {allitem.map((option, index) => (
                    <option key={index} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <input
                  className="border rounded py-[10px] mt-1 text-center w-[90px] md:w-[150px] mr-4"
                  name="quantity"
                  placeholder="مقدار"
                  value={order.quantity}
                  type="number"
                  min={1}
                  max={order.menuItem.countStock}
                  onChange={(e) => handleInputChange2(e, i)}
                />
              </div>
            ))
          ) : (
            <p>فرمایش قبلی موجود نمی باشد </p>
          )}
        </div>
        {inputList.map((x, i) => {
          const max =
            filteredItems &&
            filteredItems.filter((item: any) => item.name === x.name);
          const realmax = max.length > 0 && max[0].countStock;

          return (
            <>
              <div className="box flex flex-row md:block" key={i}>
                <select
                  className="border rounded py-2 px-5 mr-2 w-[140px] md:w-[200px]"
                  name="name"
                  value={x.name}
                  onChange={(e) => handleInputChange(e, i)}
                >
                  <option value="" disabled>
                    انتخاب فرمایش
                  </option>
                  {allitem.map((option, index) => (
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
                {/* {inputList.length !== 1 && ( */}
                <button
                  className="bg-red-500 hover:bg-red-600 text-sm mt-2 text-white py-2 px-2 rounded mr-4"
                  onClick={() => handleRemoveClick(i)}
                >
                  <div className="flex items-center justify-center">
                    {/* <p> حذف </p> */}
                    <Trash2 color="#fff" size={17} />
                  </div>
                </button>
                {/* )} */}
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
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 flex items-center gap-2 text-white bg-green-500"
      >
        ثبت
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      </Button>
    </div>
  );
};

export default SaveOrder;
