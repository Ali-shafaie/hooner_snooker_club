import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("لطفا نام تان را وارید نمایید"),
  // amount: Yup.number()
  //   .required("لطفا مقدار پول را وارید نماید")
  //   .positive()
  //   .integer(),
  // description: Yup.string().required(" لطفا توضحات در باره مصارف اضافه نماید"),
  // category: Yup.string().required("لطفا کتگوری را انتخاب نماید"),
});

interface NewModalExpanseProps {
  onClose?: () => void;
  editData: {
    id: number;
    staff_id: number;
    name: string;
    amount: number;
    salary: number;
    phone: number;
    job: string;
    expireDate: number;
    description: string;
    category: string;
    staffs: any;
  };
  updateFetch: () => void;
  activeTabCategory: string;
  staffs: any;
}
const StaffEditForm = ({
  updateFetch,
  editData,
  onClose,
  activeTabCategory,
}: NewModalExpanseProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: (editData.name || editData.staffs?.name) ?? "",
      amount: editData.amount ?? "",
      salary: editData.salary ?? "",
      phone: editData.phone ?? "",
      job: editData.job ?? "",
      expireDate: editData.expireDate ?? "",
      description: editData.description ?? "",
      category: editData.category ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any, { resetForm }: any) => {
      setIsLoading(true);
      if (editData.id) {
        await axios.patch(`/api/expense/${editData.id}`, values).then((res) => {
          if (res.status === 201) {
            toast.success("شما موفقانه مصارف خود را ویرایش کردید");
            setIsLoading(false);
            updateFetch();
            if (onClose) {
              onClose();
            }
          } else {
            toast.error("شما در ویرایش مصارف مشکل دارید");
            setIsLoading(false);
          }
        });
      }
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Semi-transparent black background overlay */}
      <div
        className="fixed inset-0 bg-black opacity-70 z-40"
        onClick={onClose}
      ></div>
      <div className="bg-white  rounded shadow-lg w-[30rem]  relative z-50 rounded-t-[10px]">
        <div className="flex p-4 justify-between items-center rounded-t-[7px] bg-green-600">
          <h2 className="text-xl font-bold flex items-center justify-center text-white">
            1 فورم مصارف جدید
          </h2>
          <Button variant={"ghost"} type="button" onClick={onClose}>
            <X className="text-white" />
          </Button>
        </div>
        <div className="p-6">
          <form onSubmit={formik.handleSubmit}>
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
                <p className="error">{formik.errors.name as React.ReactNode}</p>
              )}
            </div>
            {activeTabCategory === "EMPLOYEE" ? (
              <>
                <div className="mb-4">
                  <label htmlFor="job" className="block text-gray-600 mb-2">
                    وظیفه:
                  </label>
                  <input
                    type="text"
                    id="job"
                    name="job"
                    className={`w-full border rounded px-3 py-2 ${
                      formik.touched.job && formik.errors.job
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.job}
                  />
                  {formik.touched.job && formik.errors.job && (
                    <p className="error">{formik.errors.job}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-600 mb-2">
                    شماره تلفن:
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    className={`w-full border rounded px-3 py-2 ${
                      formik.touched.phone && formik.errors.phone
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="error">{formik.errors.phone}</p>
                  )}
                </div>
              </>
            ) : (
              ///part other category
              <>
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-gray-600 mb-2">
                    مقدار:
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
                  <label
                    htmlFor="description"
                    className="block text-gray-600 mb-2"
                  >
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
                  <label
                    htmlFor="category"
                    className="block text-gray-600 mb-2"
                  >
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
                </div>
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
              </>
            )}

            <div className="text-right">
              <Button variant={"green"} type="submit">
                ذخیره
                {isLoading && <Loader2 className="w-5 h-5 mx-2 animate-spin" />}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffEditForm;
