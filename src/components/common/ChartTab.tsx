"use client"
import React, { useState } from "react";

interface ChartTabProps {
  setFilterDays: (days: number) => void; // Function to update filter days
}

const ChartTab: React.FC<ChartTabProps> = ({ setFilterDays }) => {
  const [selected, setSelected] = useState<7 | 14 | 30 | 180| 365| 1825>(7); // Default: 7 Days

  const getButtonClass = (option: 7 | 14 | 30 | 180 | 365 | 1825) =>
    selected === option
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button
        onClick={() => {
          setSelected(7);
          setFilterDays(7);
        }}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(7)}`}
      >
        7d
      </button>

      <button
        onClick={() => {
          setSelected(14);
          setFilterDays(14);
        }}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(14)}`}
      >
        14d
      </button>

      <button
        onClick={() => {
          setSelected(30);
          setFilterDays(30);
        }}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(30)}`}
      >
        30d
      </button>
      <button
        onClick={() => {
          setSelected(180);
          setFilterDays(180);
        }}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(180)}`}
      >
        6M
      </button>
      <button
        onClick={() => {
          setSelected(365);
          setFilterDays(365);
        }}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(365)}`}
      >
        1Y
      </button>
      <button
        onClick={() => {
          setSelected(1825);
          setFilterDays(1825);
        }}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(1825)}`}
      >
        5Y
      </button>
    </div>
  );
};

export default ChartTab;
