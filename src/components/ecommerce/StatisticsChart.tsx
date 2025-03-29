"use client";
import React, { useState, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";
import { useGoldData, GoldData } from "@/hooks/goldPriceFetcher";
import { format, parseISO, isValid } from "date-fns";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StatisticsChart() {
  const [filterDays, setFilterDays] = useState<number>(7);
  const { data = [], loading, error } = useGoldData(filterDays);

  const aggregateData = (data: GoldData[], type: "monthly" | "yearly") => {
    const aggregatedData: { [key: string]: { sum: number; count: number } } = {};
    const dateFormat = type === "monthly" ? "yyyy-MM" : "yyyy";

    data.forEach((entry) => {
      const parsedDate = parseISO(entry.date);
      if (!isValid(parsedDate)) return;

      const key = format(parsedDate, dateFormat);
      if (!aggregatedData[key]) aggregatedData[key] = { sum: 0, count: 0 };
      aggregatedData[key].sum += entry.close ?? 0;
      aggregatedData[key].count += 1;
    });

    return Object.entries(aggregatedData).map(([date, values]) => ({
      date,
      close: parseFloat((values.sum / values.count).toFixed(2)),
    }));
  };

  const processedData = useMemo(() => {
    if (filterDays === 365) return aggregateData(data, "monthly");
    if (filterDays === 1825) return aggregateData(data, "yearly");
    if (filterDays === 180) return data.filter((_, index) => index % 5 === 0);
    return data;
  }, [data, filterDays]);

  const formattedDates = useMemo(() =>
    processedData.map((entry) => {
      if (filterDays === 365) return format(parseISO(entry.date), "MMM yyyy");
      if (filterDays === 1825) return entry.date;
      const parsedDate = parseISO(entry.date);
      return isValid(parsedDate)
        ? format(parsedDate, filterDays <= 30 ? "dd MMM" : filterDays <= 365 ? "MMM yyyy" : "yyyy")
        : "Invalid Date";
    }),
  [processedData, filterDays]);

  const closePrices = useMemo(() => processedData.map((entry) => parseFloat((entry.close ?? 0).toFixed(2))), [processedData]);

  const options: ApexOptions = useMemo(() => ({
    chart: { type: "line", height: 310, toolbar: { show: false } },
    xaxis: { type: "category", categories: formattedDates, labels: { rotate: -45 } },
    yaxis: { title: { text: "Close Price (USD)" }, labels: { formatter: (value) => value.toFixed(2) } },
    stroke: { curve: "smooth", width: 2 },
    tooltip: {
      x: { formatter: (_, { dataPointIndex }) => formattedDates[dataPointIndex] || "Invalid Date" },
      y: { formatter: (value) => value.toFixed(2) },
    },
  }), [formattedDates]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 shadow-lg dark:shadow-md">

      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-transparent bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-300 bg-clip-text">
          Gold Price Statistics
        </h2>
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
