"use client";

import React, { useState } from "react";

type TabLayoutT = {
  children: React.ReactNode;
  tabs: string[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export default function TabLayout({
  tabs,
  children,
  activeTab,
  setActiveTab,
}: TabLayoutT) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-1/3 mx-auto">
        {tabs.map((tab) => (
          <button
            key={`${tab}_button`}
            className={`w-full text-center text-dodger-blue-500 border-b-2 py-2 ${
              tab === activeTab
                ? "border-dodger-blue-500"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
