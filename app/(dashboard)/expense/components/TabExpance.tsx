"use client";

import React, { useState } from "react";
import TabTableList from "./TabTableList";

type TabContent = {
  [key: string]: string;
};

const TabListExpense = ({
  updateFetch,
  currentTable,
  isModalOpen,
  staffs,
  onClick,
}: any) => {
  const [activeTabCategory, setActiveTabCategory] = useState("CAFE");

  const tabCategories = [
    { label: "CAFE", value: "کانتین" },
    { label: "ADMINCOST", value: "مصارف عملیاتی" },
    { label: "ASSETCOST", value: "مصارف سرمایه" },
    { label: "KITCHEN", value: "رستورانت" },
    { label: "REPAIR", value: "تعمیر" },
    { label: "EMPLOYEE", value: "کارمندان" },
    { label: "OTHERS", value: "سایر" },
  ];
  //

  const changeTabCategory = (tabName: any) => {
    setActiveTabCategory(tabName);
  };

  const filterExpensesByCategory = (category: any) => {
    return currentTable.filter((expense: any) => expense.category === category);
  };

  const filteredExpenses = filterExpensesByCategory(activeTabCategory);
  const [activeTab, setActiveTab] = useState("Today");

  const tabContent = [
    { label: "Today", value: "روزانه" },
    { label: "Weekly", value: "هفته وار" },
    { label: "Monthly", value: "ماهانه" },
    { label: "Yearly", value: "سالانه" },
  ];

  const changeTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="px-1 md:px-4">
      <div className="flex flex-wrap justify-between bg-gray-200 w-full">
        <div className="flex flex-wrap">
          {tabCategories.map((item, index) => (
            <button
              key={index}
              onClick={() => changeTabCategory(item.label)}
              className={`${
                activeTabCategory === item.label
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } px-1 md:px-4 mx-1 py-2 text-[12px] md:h-10 whitespace-nowrap`}
            >
              {item.value}
            </button>
          ))}
        </div>
        <div className="flex">
          {tabContent.map((item, index) => (
            <button
              key={index}
              onClick={() => changeTab(item.label)}
              className={`${
                activeTab === item.label
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } px-1 md:px-4 mx-1 py-2 text-[12px] md:h-10 whitespace-nowrap`}
            >
              {item.value}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <TabTableList
          onClick={onClick}
          staffs={staffs}
          currentTable={filteredExpenses}
          activeTab={activeTab}
          activeTabCategory={activeTabCategory}
          updateFetch={updateFetch}
        />
      </div>
    </div>
  );
};

export default TabListExpense;
