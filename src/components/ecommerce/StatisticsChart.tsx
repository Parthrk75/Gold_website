"use client";
import React, { useState, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";
import { useGoldData, GoldData } from "@/hooks/goldPriceFetcher"; // ✅ Correct type import
import { format, parseISO, isValid } from "date-fns";

// Lazy load the ApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StatisticsChart() {
  const [filterDays, setFilterDays] = useState<number>(7);
  const { data = [], loading, error } = useGoldData(filterDays);

  // ✅ Function to slice data for better readability
  const getSlicedData = (data: GoldData[], step: number): GoldData[] => {
    return data.filter((_, index) => index % step === 0);
  };

  // ✅ Optimize data selection using useMemo
  const slicedData = useMemo(() => {
    if (filterDays === 180) return getSlicedData(data, 5);
    if (filterDays === 365) return getSlicedData(data, 10);
    if (filterDays === 1825) return getSlicedData(data, 20);
    return data;
  }, [data, filterDays]);

  // ✅ Format dates properly for x-axis labels
  const formattedDates = useMemo(() => {
    return slicedData.map((entry) => {
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
  const closePrices = useMemo(() => slicedData.map((entry) => entry.close ?? 0), [slicedData]);

  // ✅ Chart Configuration (Memoized)
  const options: ApexOptions = useMemo(
    () => ({
      chart: { type: "line", height: 310, toolbar: { show: false } },
      xaxis: {
        type: "category",
        categories: formattedDates,
        labels: { rotate: -45 },
      },
      yaxis: { title: { text: "Close Price (USD)" } },
      stroke: { curve: "smooth", width: 2 },
      tooltip: {
        x: { formatter: (_, { dataPointIndex }) => formattedDates[dataPointIndex] || "Invalid Date" },
      },
    }),
    [formattedDates]
  );

  // ✅ Lazy-load chart only when needed
  const ChartComponent = useMemo(
    () =>
      filterDays === 7 ? (
        <ReactApexChart options={options} series={[{ name: "Close Price", data: closePrices }]} type="line" height={310} />
      ) : (
        <Suspense fallback={<p className="text-center text-gray-500">Loading chart...</p>}>
          <ReactApexChart options={options} series={[{ name: "Close Price", data: closePrices }]} type="line" height={310} />
        </Suspense>
      ),
    [filterDays, options, closePrices]
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Gold Price Statistics</h3>
          <p className="text-gray-500 text-sm dark:text-gray-400">Historical gold prices for {filterDays} days</p>
        </div>
        <ChartTab setFilterDays={setFilterDays} />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        ChartComponent
      )}
    </div>
  );
}
