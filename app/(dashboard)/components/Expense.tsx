import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface ExpenseProps {
  tabContentDate: any;
  changeTabDate: (tabName: string) => void;
  activeTabDate: string;
  totalAmountAssestCostExpense: number;
  totalAmountAdminExpense: number;
  totalAmountKitchenExpense: number;
  totalAmountOtherExpense: number;
  totalAmountCafeExpense: number;
  totalAmountReparExpense: number;
}

import kitchenImage from "../../../public/kitchen.png";
import canteen from "../../../public/canteen.png";
import building from "../../../public/repair.png";
import money from "../../../public/money-bag.png";
import admin from "../../../public/admin.png";
import others from "../../../public/expenses.png";
import { ExpenseCategoriesType } from "@/types/expense";
interface Props {
  expense: ExpenseCategoriesType;
}
const Expense = ({ expense }: Props) => {
  return (
    <div className="md:h-screen mt-5 bg-gray-200 p-5">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3  mt-5">
        <Card className="bg-white rounded">
          <CardHeader>
            <div className="flex justify-between gap-1">
              <div>
                <CardTitle className="text-[13px] font-bold ">
                  مصارف مجموعی تعمیر
                </CardTitle>
                {expense.REPAIR > 0 ? (
                  <div className="text-xl pt-2 font-bold">
                    {expense.REPAIR} افغانی
                  </div>
                ) : (
                  <div className="text-[11px] pt-3 font-bold text-gray-500">
                    تا هنوز مصارف ثبت نشده
                  </div>
                )}{" "}
              </div>
              <Image
                src={building}
                alt=""
                width={80}
                height={80}
                className="rounded-md"
              />
            </div>
          </CardHeader>
        </Card>
        <Card className="bg-white rounded">
          <CardHeader>
            <div className="flex justify-between gap-1">
              <div>
                <CardTitle className="text-[13px] font-bold ">
                  مصارف مجموعی سرمایه
                </CardTitle>
                {expense.REPAIR > 0 ? (
                  <div className="text-xl pt-2 font-bold">
                    {expense.REPAIR} افغانی
                  </div>
                ) : (
                  <div className="text-[11px] pt-3 font-bold text-gray-500">
                    تا هنوز مصارف ثبت نشده
                  </div>
                )}{" "}
              </div>
              <Image
                src={money}
                alt=""
                width={90}
                height={90}
                className="rounded-md"
              />
            </div>
          </CardHeader>
        </Card>
        <Card className="bg-white rounded">
          <CardHeader>
            <div className="flex justify-between gap-1">
              <div>
                <CardTitle className="text-[13px] font-bold ">
                  مصارف مجموعی آشپزخانه
                </CardTitle>
                {expense.KITCHEN > 0 ? (
                  <div className="text-xl pt-2 font-bold">
                    {expense.KITCHEN} افغانی
                  </div>
                ) : (
                  <div className="text-[11px] pt-3 font-bold text-gray-500">
                    تا هنوز مصارف ثبت نشده
                  </div>
                )}{" "}
              </div>
              <Image
                src={kitchenImage}
                alt=""
                width={90}
                height={90}
                className="rounded-md"
              />
            </div>
          </CardHeader>
        </Card>
        <Card className="bg-white rounded">
          <CardHeader>
            <div className="flex justify-between gap-1">
              <div>
                <CardTitle className="text-[13px] font-bold ">
                  مصارف مجموعی کانتین
                </CardTitle>
                {expense.CAFE > 0 ? (
                  <div className="text-xl pt-2 font-bold">
                    {expense.CAFE} افغانی
                  </div>
                ) : (
                  <div className="text-[11px] pt-3 font-bold text-gray-500">
                    تا هنوز مصارف ثبت نشده
                  </div>
                )}{" "}
              </div>
              <Image
                src={canteen}
                alt=""
                width={90}
                height={90}
                className="rounded-md"
              />
            </div>
          </CardHeader>
        </Card>
        <Card className="bg-white rounded">
          <CardHeader>
            <div className="flex justify-between gap-1">
              <div>
                <CardTitle className="text-[13px] font-bold ">
                  مصارف مجموعی ادمین
                </CardTitle>
                {expense.ADMINCOST > 0 ? (
                  <div className="text-xl pt-2 font-bold">
                    {expense.ADMINCOST} افغانی
                  </div>
                ) : (
                  <div className="text-[11px] pt-3 font-bold text-gray-500">
                    تا هنوز مصارف ثبت نشده
                  </div>
                )}{" "}
              </div>
              <Image
                src={admin}
                alt=""
                width={90}
                height={90}
                className="rounded-md"
              />
            </div>
          </CardHeader>
        </Card>
        <Card className="bg-white rounded">
          <CardHeader>
            <div className="flex justify-between gap-1">
              <div>
                <CardTitle className="text-[13px] font-bold ">
                  مصارف مجموعی سایر
                </CardTitle>
                {expense.OTHERS > 0 ? (
                  <div className="text-xl pt-2 font-bold">
                    {expense.OTHERS} افغانی
                  </div>
                ) : (
                  <div className="text-[11px] pt-3 font-bold text-gray-500">
                    تا هنوز مصارف ثبت نشده
                  </div>
                )}{" "}
              </div>
              <Image
                src={others}
                alt=""
                width={90}
                height={90}
                className="rounded-md"
              />
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Expense;
