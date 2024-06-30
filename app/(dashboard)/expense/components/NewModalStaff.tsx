import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("لطفا نام کارمند را وارید نمایید"),
  phone: Yup.number()
    .required("لطفا شماره تماس را وارید نماید")
    .positive()
    .integer(),
  job: Yup.string().required(" لطفا عنوان وظیفه اضافه نماید"),
});

interface NewModalExpanseProps {
  onClose?: () => void;
  updateFetch: () => void;
}
const NewModalStaff = ({ updateFetch, onClose }: NewModalExpanseProps) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      job: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any, { resetForm }: any) => {
      setLoading(true);
      await axios.post(`/api/staff/new`, values).then((res) => {
        if (res.status === 201) {
          toast.success("شما موفقانه کارمند خود را ثبت کردید");
          setLoading(false);
          updateFetch();
          window.location.reload();
          if (onClose) {
            onClose();
          }
        } else {
          toast.error("شما در ثبت کارمند مشکل دارید");
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
            فورم کارمند جدید
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
                <p className="error">{formik.errors.name}</p>
              )}
            </div>
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
                شماره تماس:
              </label>
              <input
                type="text"
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

export default NewModalStaff;
