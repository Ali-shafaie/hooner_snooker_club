import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  // name: Yup.string().required("لطفا نام تان را وارید نمایید"),
  amount: Yup.number()
    .required("لطفا مقدار پول را وارید نماید")
    .positive()
    .integer(),
  description: Yup.string().required(" لطفا توضحات در باره مصارف اضافه نماید"),
  category: Yup.string().required("لطفا کتگوری را انتخاب نماید"),
});

interface NewModalExpanseProps {
  onClose?: () => void;
  updateFetch: () => void;
  staffs: any[];
}
interface Staff {
  id: number;
  name: string;
  job: string;
  phone: string;
  salary: number;
}
const NewModalFormExpense = ({
  updateFetch,
  onClose,
  staffs,
}: NewModalExpanseProps) => {
  const [isLoading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("other");
  const [selectedStaff, setSelectedStaff] = useState("");

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      amount: "",
      expireDate: "",
      description: "",
      category: "",
      staff: selectedStaff,
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any, { resetForm }: any) => {
      setLoading(true);
      await axios.post(`/api/expense/new`, values).then((res) => {
        if (res.status === 201) {
          toast.success("شما موفقانه مصارف خود را ثبت کردید");
          setLoading(false);
          window.location.reload();
          updateFetch();
          if (onClose) {
            onClose();
          }
        } else {
          toast.error("شما در ثبت مصارف مشکل دارید");
        }
      });
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Semi-transparent black background overlay */}
      <div
        className="fixed inset-0 bg-black opacity-70 z-40"
        onClick={onClose}
      ></div>
      <div className="bg-white  rounded shadow-lg w-[34rem] relative z-50 rounded-t-[10px]">
        <div className="flex mx-auto justify-between items-center rounded-t-[7px] bg-green-600">
          <h2 className="text-xl font-bold p-5 flex items-center justify-center text-white">
            فورم مصارف جدید
          </h2>
          <Button variant={"ghost"} type="button" onClick={onClose}>
            <X className="text-white" />
          </Button>
        </div>
        <div className="flex justify-center items-center p-3">
          <h1
            className={
              selectedTab === "other"
                ? "bg-green-600 px-3 py-1 text-white cursor-pointer"
                : "px-3 py-1 border cursor-pointer"
            }
            onClick={() => handleTabChange("other")}
          >
            عمومی
          </h1>
          <h1
            className={
              selectedTab === "employee"
                ? "bg-green-600 px-3 py-1 text-white cursor-pointer"
                : "px-3 py-1 border cursor-pointer"
            }
            onClick={() => handleTabChange("employee")}
          >
            کارمند
          </h1>
        </div>
        <div className="p-6">
          <form onSubmit={formik.handleSubmit}>
            {selectedTab === "other" && (
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-600 mb-2">
                  نام:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`w-full border rounded px-3 py-2 ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="error">{formik.errors.name}</p>
                )}
              </div>
            )}
            {selectedTab === "employee" && (
              <div className="mb-4">
                <label htmlFor="staff" className="block text-gray-600 mb-2">
                  انتخاب کارمند:
                </label>
                <select
                  id="staff"
                  name="staff"
                  className={`w-full border rounded px-3 py-2 ${
                    formik.touched.staff && formik.errors.staff
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setSelectedStaff(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  value={selectedStaff}
                >
                  <option value="" disabled>
                    انتخاب کارمند
                  </option>
                  {staffs.map((staff: any) => (
                    <option
                      key={staff.staff_id}
                      value={staff.staff_id.toString()}
                    >
                      {staff.name}
                    </option>
                  ))}
                </select>
                {formik.touched.staff && formik.errors.staff && (
                  <p className="error">{formik.errors.staff}</p>
                )}
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="amount" className="block text-gray-600 mb-2">
                پول:
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                className={`w-full border rounded px-3 py-2 ${
                  formik.touched.amount && formik.errors.amount
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amount}
              />
              {formik.touched.amount && formik.errors.amount && (
                <p className="error">{formik.errors.amount}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-600 mb-2">
                توضیحات:
              </label>
              <textarea
                id="description"
                name="description"
                className={`w-full border rounded px-3 py-2 ${
                  formik.touched.description && formik.errors.description
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="error">{formik.errors.description}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-600 mb-2">
                کتگوری:
              </label>
              <select
                id="category"
                name="category"
                className={`w-full border rounded px-3 py-2 ${
                  formik.touched.category && formik.errors.category
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
              >
                <option value="">انتخاب کتگوری</option>
                <option value="CAFE">کانتین</option>
                <option value="REPAIR">تعمیر</option>
                <option value="KITCHEN">آشپز خانه</option>
                <option value="ADMINCOST">مصارف عملیاتی</option>
                <option value="ASSETCOST">مصارف سرمایه</option>
                <option value="OTHERS">سایر ...</option>
              </select>
              {formik.touched.category && formik.errors.category && (
                <p className="error">{formik.errors.category}</p>
              )}
            </div>{" "}
            {formik.values.category === "ASSETCOST" && (
              <div className="mb-4">
                <label
                  htmlFor="expireDate"
                  className="block text-gray-600 mb-2"
                >
                  مدت استهلاک
                </label>
                <input
                  type="number"
                  id="expireDate"
                  name="expireDate"
                  className={`w-full border rounded px-3 py-2 ${
                    formik.touched.expireDate && formik.errors.expireDate
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.expireDate}
                />
                {formik.touched.expireDate && formik.errors.expireDate && (
                  <p className="error">{formik.errors.expireDate}</p>
                )}
              </div>
            )}
            <div className="text-right">
              <Button variant={"green"} type="submit">
                ذخیره
                {isLoading && <Loader2 className="w-6 h-4 animate-spin " />}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewModalFormExpense;
