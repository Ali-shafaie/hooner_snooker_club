"use client";

import React, { useEffect, useState } from "react";
import TableDetailsPage from "./TableDetails";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type TabContent = {
  [key: string]: string;
};

const TabList = ({ currentTable }: any) => {
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
    <div className="px-4">
      <div className="bg-gray-200 w-full">
        <div className="flex">
          {tabContent.map((item, index) => (
            <button
              key={index}
              onClick={() => changeTab(item.label)}
              className={`${
                activeTab === item.label
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } px-4 py-2 h-10`}
            >
              {item.value}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        {/* Pass activeTab to TableDetailsPage */}
        <TableDetailsPage currentTable={currentTable} activeTab={activeTab} />
      </div>
    </div>
  );
};

export default TabList;
