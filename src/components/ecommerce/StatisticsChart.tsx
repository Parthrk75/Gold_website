"use client";
import React, { useState, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";
import { useGoldData, GoldData } from "@/hooks/goldPriceFetcher";
import { format, parseISO, isValid } from "date-fns";

// Lazy load the ApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StatisticsChart() {
  const [filterDays, setFilterDays] = useState<number>(7);
  const { data = [], loading, error } = useGoldData(filterDays);

  // ✅ Function to calculate monthly averages for 1Y
  const getMonthlyAverages = (data: GoldData[]) => {
    const monthlyData: { [key: string]: { sum: number; count: number } } = {};

    data.forEach((entry) => {
      const parsedDate = parseISO(entry.date);
      if (!isValid(parsedDate)) return;

      const key = format(parsedDate, "yyyy-MM"); // Example: "2024-03"
      if (!monthlyData[key]) {
        monthlyData[key] = { sum: 0, count: 0 };
      }

      monthlyData[key].sum += entry.close ?? 0;
      monthlyData[key].count += 1;
    });

    return Object.entries(monthlyData).map(([month, values]) => ({
      date: month, // Keep "yyyy-MM" format
      close: parseFloat((values.sum / values.count).toFixed(2)), // ✅ Rounded to 2 decimal places
    }));
  };

  // ✅ Function to calculate yearly averages for 5Y
  const getYearlyAverages = (data: GoldData[]) => {
    const yearlyData: { [key: string]: { sum: number; count: number } } = {};

    data.forEach((entry) => {
      const parsedDate = parseISO(entry.date);
      if (!isValid(parsedDate)) return;

      const key = format(parsedDate, "yyyy"); // Example: "2024"
      if (!yearlyData[key]) {
        yearlyData[key] = { sum: 0, count: 0 };
      }

      yearlyData[key].sum += entry.close ?? 0;
      yearlyData[key].count += 1;
    });

    return Object.entries(yearlyData).map(([year, values]) => ({
      date: year, // Keep "yyyy" format
      close: parseFloat((values.sum / values.count).toFixed(2)), // ✅ Rounded to 2 decimal places
    }));
  };

  // ✅ Optimize data selection using useMemo
  const slicedData = useMemo(() => {
    if (filterDays === 365) return getMonthlyAverages(data); // Aggregate months
    if (filterDays === 1825) return getYearlyAverages(data); // Aggregate years
    if (filterDays === 180) return data.filter((_, index) => index % 5 === 0);
    return data;
  }, [data, filterDays]);

  // ✅ Format dates for x-axis labels
  const formattedDates = useMemo(() => {
    return slicedData.map((entry) => {
      if (filterDays === 365) return format(parseISO(entry.date), "MMM yyyy"); // Monthly format for 1Y
      if (filterDays === 1825) return entry.date; // Just the year for 5Y
      const parsedDate = parseISO(entry.date);
      return isValid(parsedDate)
        ? filterDays <= 30
          ? format(parsedDate, "dd MMM") // "14 Mar"
          : filterDays <= 365
          ? format(parsedDate, "MMM yyyy") // "Jan 2024"
          : format(parsedDate, "yyyy") // "2021, 2022"
        : "Invalid Date";
    });
  }, [slicedData, filterDays]);

  // ✅ Extract closing prices (handling null values)
  const closePrices = useMemo(() => slicedData.map((entry) => parseFloat((entry.close ?? 0).toFixed(2))), [slicedData]);

  // ✅ Chart Configuration (Memoized) with rounded y-axis labels
  const options: ApexOptions = useMemo(
    () => ({
      chart: { type: "line", height: 310, toolbar: { show: false } },
      xaxis: {
        type: "category",
        categories: formattedDates,
        labels: { rotate: -45 },
      },
      yaxis: { 
        title: { text: "Close Price (USD)" }, 
        labels: {
          formatter: (value) => value.toFixed(2), // ✅ Round y-axis labels to 2 decimal places
        },
      },
      stroke: { curve: "smooth", width: 2 },
      tooltip: {
        x: { formatter: (_, { dataPointIndex }) => formattedDates[dataPointIndex] || "Invalid Date" },
        y: { formatter: (value) => value.toFixed(2) }, // ✅ Round tooltip values to 2 decimal places
      },
    }),
    [formattedDates]
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      {/* Tabs should be in one row on larger screens */}
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center mb-6">
        <div>
          <h3 className="text-lg text-blue-500 font-semibold  dark:text-blue-500">Gold Price Statistics</h3>
          <p className="text-gray-500 text-sm dark:text-gray-400">Historical gold prices for {filterDays} days</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <ChartTab setFilterDays={setFilterDays} />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <Suspense fallback={<p className="text-center text-gray-500">Loading chart...</p>}>
          <ReactApexChart options={options} series={[{ name: "Close Price", data: closePrices }]} type="line" height={310} />
        </Suspense>
      )}
    </div>
  );
}



