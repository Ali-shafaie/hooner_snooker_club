"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";

const initialValues = {
  customerName: "",
  items: [{ selectedOption: "", amount: "" }],
};

const SellPhone = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const router = useRouter();
  const { data: session } = useSession();

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/auth/signin");
  //   }
  // }, [router, session]);

  useEffect(() => {
    axios
      .get("/api/menuItem")
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const addSelectInput = () => {
    formik.setValues({
      ...formik.values,
      items: [...formik.values.items, { selectedOption: "", amount: "" }],
    });
  };

  const onSubmit = async (values: any) => {
    try {
      handlePrint(values);
      const response = await axios.post("/api/product/otherProduct", values);
      setData(values);

      formik.handleReset(undefined);

      toast.success("فروش موفقانه صورت گرفت");
      window.location.reload();
    } catch (error) {
      toast.error("ببخشید فرمایش ذخیره نشد");
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  // PRINT
  const handlePrint = (values: any) => {
    const printWindow = window.open("", "_blank");

    const mergedArray = options
      .map((item1: any) => {
        const matchingItem = values.items?.find(
          (item2: any) => item1.name === item2.selectedOption
        );
        if (matchingItem) {
          return { ...item1, ...matchingItem };
        } else {
          return null; // Return null for items that don't match
        }
      })
      .filter((item) => item !== null);

    let total = 0;
    mergedArray.map((item: any) => {
      total += Number(item.amount) * Number(item.price);
    });

    if (printWindow) {
      const printContent = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Print Bill</title>
           <style>
              /* Add your print styles here */
             body {
  font-family: Arial, sans-serif;
  direction: rtl;
  padding-bottom: 18px;
}

.print-title {
  text-align: center;
  font-size: 17px;
  font-weight: bold;
}

.print-logo {
  text-align: center;
  margin-top: 18px;
}

.print-list {
  margin-top: 5px;
}

.data-table {
  width: 100%;
  // border-collapse: collapse;
  margin-top: 3px;
  table-layout: fixed; /* Ensure each cell has the same width */
}

.data-table th,
.data-table td {
  text-align: center;
  padding: 2px;
  // border: 1px solid #000;
  white-space: normal; /* Allow text to wrap within the cells */
  word-break: break-word; /* Allow words to break when they don't fit */
  overflow: hidden;
}

.span-list {
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
  border-bottom: 1px dashed black;
}

.span-sign {
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  border-top: 1px dashed #000;
}

.span-down {
  margin-top: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  border-top: 0.2px dashed #ddd;
}

.test {
  flex: 1;
  text-align: center;
}

            </style>
          </head>
          <body>
          <div class="print-logo">
          <img src='/assets/logopng.png' alt="Logo" width="100" height="100"/>
        </div>
        <div style="padding-right:20px; padding-left:20px">
        <div class="print-title" >${" بل سفارشات متفرقه "}</div>
        
       
        <div class="span-list">
        <span class=""> اسم مشتری : </span>
        <span class="">${values.customerName}</span>
        </div>
        <table class="data-table">
      <thead>
        <tr class="span-list">
          <th class="test">شماره</th>
          <th class="test">نام</th>
          <th class="test">تعداد</th>
          <th class="test">مجموع</th>
        </tr>
      </thead>
      ${mergedArray.map(
        (item: any, index: any) => `
      <tbody>
 <tr class="span-list" key=${index} style="font-size:14px">
      <td class="test">${index + 1}</td>
      <td class="test" style="font-size:12px">${item.selectedOption}</td>
      <td class="test">${item.amount}</td>
      <td class="test">${Number(item.amount) * Number(item.price)} </td>
  </tr>
    <br />
      </tbody>
      `
      )}
      </table>
          <div class=" " style="padding-bottom:10px">
        <span class=""> قیمت مجموعی  ${total}  :‌</span>
    
    
        </div> 
        <div class="span-down " style="padding-bottom:10px">
        <span class=""></span>
        <span class="" style="font-size:13px"> </span>
        </div>
        </div>
        </div>
        </body>
        </html>
        `;

      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    }
  };

  return (
    <>
      <button
        className="bg-green-500 px-3 py-2 mr-5 text-white mb-5"
        onClick={() => router.push("/sales/all")}
      >
        لیست فروشات
      </button>
      <div className="max-w-md mx-auto p-4 border rounded shadow-md py-5 mb-12 pb-5">
        <h3 className="text-center text-lg font-bold py-2">سفارشات متفرقه</h3>
        <form onSubmit={formik.handleSubmit}>
          {formik.values.items.map((item, index) => (
            <div key={index}>
              <div className="mb-4">
                <label
                  htmlFor={`selectedOption-${index}`}
                  className="block text-gray-600 font-bold mb-2"
                >
                  انتخاب منیو
                </label>
                <select
                  id={`selectedOption-${index}`}
                  name={`items[${index}].selectedOption`}
                  className="w-full border rounded py-2 px-3"
                  value={item.selectedOption}
                  onChange={formik.handleChange}
                >
                  <option value="" disabled>
                    انتخاب منیو
                  </option>
                  {options.map((option: any) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor={`amount-${index}`}
                  className="block text-gray-600 font-bold mb-2"
                >
                  مقدار
                </label>
                <input
                  type="number"
                  id={`amount-${index}`}
                  name={`items[${index}].amount`}
                  className="w-full border rounded py-2 px-3"
                  value={item.amount}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          ))}
          {/* <button type="button" onClick={addSelectInput} className="mb-4">
            افزودن
          </button> */}
          <PlusCircle
            className="text-green-500 mb-4"
            onClick={addSelectInput}
          />

          <div className="mb-4">
            <label
              htmlFor="customerName"
              className="block text-gray-600 font-bold mb-2"
            >
              اسم مشتری
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              className="w-full border rounded py-2 px-3"
              value={formik.values.customerName}
              onChange={formik.handleChange}
            />
          </div>

          <div className="flex justify-between">
            <Button className="mt-4 flex items-center gap-2 text-white bg-green-500">
              ثبت
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SellPhone;
