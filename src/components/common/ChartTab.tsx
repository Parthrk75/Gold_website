"use client";
import React, { useState } from "react";

interface ChartTabProps {
  setFilterDays: (days: number) => void;
}

const ChartTab: React.FC<ChartTabProps> = ({ setFilterDays }) => {
  const [selected, setSelected] = useState<7 | 14 | 30 | 180 | 365 | 1825>(7);

  const getButtonClass = (option: 7 | 14 | 30 | 180 | 365 | 1825) =>
    selected === option
      ? "shadow-theme-xs text-transparent bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-300 bg-clip-text font-semibold bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";
  
  return (
    <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start gap-2 p-1 rounded-lg bg-gray-100 dark:bg-gray-900">
      {[7, 14, 30, 180, 365, 1825].map((days) => (
        <button
          key={days}
          onClick={() => {
            setSelected(days as 7 | 14 | 30 | 180 | 365 | 1825);
            setFilterDays(days);
          }}
          className={`px-3 py-2 font-medium text-theme-sm w-[30%] sm:w-auto rounded-md hover:text-gray-900 dark:hover:text-white ${getButtonClass(days as 7 | 14 | 30 | 180 | 365 | 1825)}`}
        >
          {days === 7 ? "7d" : days === 14 ? "14d" : days === 30 ? "30d" : days === 180 ? "6M" : days === 365 ? "1Y" : "5Y"}
        </button>
      ))}
    </div>
  );
};

export default ChartTab;
