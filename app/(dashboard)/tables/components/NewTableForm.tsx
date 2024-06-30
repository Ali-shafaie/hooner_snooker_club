import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("لطفا نام میز را وارد کنید. "),
});

interface NewTableFormProps {
  onModalClose: any;
  handleRefresh: any;
}

const NewTableForm: React.FC<NewTableFormProps> = ({
  onModalClose,
  handleRefresh,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full">
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          setLoading(true);
          await axios
            .post("/api/tables/new", values)
            .then((res) => {
              if (res.status === 201) {
                handleRefresh();
                toast.success("میز جدید موفقانه اضافه شد. ");
                resetForm();
                setLoading(false);
                router.refresh();
                onModalClose();
              }
            })
            .catch((error) => {
              toast.error("مشکلی رخ داد لطفا چک کرده و دوباره امتحان کنید. ");
              setLoading(false);
            });
        }}>
        <Form>
          <div>
            <label htmlFor="name">نام میز</label>
            <Field
              autoComplete="off"
              name="name"
              id="name"
              placeholder="میز شماره 1"
              className="flex mt-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />

            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <Button className="mt-4 flex items-center gap-2 text-white bg-green-500">
            ذخیره
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default NewTableForm;
