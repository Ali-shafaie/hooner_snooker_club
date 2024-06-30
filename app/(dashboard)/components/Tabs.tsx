"use client";

// Tabs.tsx
import React, { useState, ReactNode, ReactElement } from "react";

interface TabProps {
  label: string;
  children: ReactNode;
}

interface TabsProps {
  children: ReactElement<TabProps>[];
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="flex gap-3 w-52 bg-gray-200 p-1 h-9 rounded items-center">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              <button
                key={index}
                className={`tab-btn p-1 rounded text-sm  ${
                  activeTab === index
                    ? "active bg-green-600 text-white"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick(index)}
              >
                {child.props.label}
              </button>
            );
          }
          return null;
        })}
      </div>
      <div>{React.Children.toArray(children)[activeTab]}</div>
    </div>
  );
};

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className="my-4 min-h-screen bg-gray-200">{children}</div>;
};
