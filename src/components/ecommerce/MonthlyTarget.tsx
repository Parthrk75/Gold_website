"use client";

import { useState, useEffect } from "react";
import { useLiveGoldPrice, useGoldData } from "@/hooks/goldPriceFetcher"; // ✅ Correct hook import
import ChartTab from "../common/ChartTab";

interface PerformanceData {
  period: string;
  oldPrice: string;
  priceDiff: string;
  change: string;
  isPositive: boolean;
}

const MonthlyTarget = () => {
  const { goldPrices, loading: liveLoading, error: liveError } = useLiveGoldPrice();
  const [filterDays, setFilterDays] = useState<number>(7);
  const { data, loading } = useGoldData(filterDays);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);

  useEffect(() => {
    if (!goldPrices || loading || !data || data.length === 0) return;

    const oldPrice: number = data[0]?.close ?? 0;
    const newPrice: number = goldPrices["24K"] ?? 0; // ✅ Ensuring newPrice is always a number

    if (oldPrice === 0 || newPrice === 0) return; // ✅ Avoid division by zero or invalid calculations

    const priceDiff: number = newPrice - oldPrice;
    const changePercentage: number = (priceDiff / oldPrice) * 100;
    const change: string = changePercentage.toFixed(2);

    setPerformanceData([
      {
        period: getTimeLabel(filterDays),
        oldPrice: oldPrice.toFixed(2),
        priceDiff: priceDiff.toFixed(2),
        change: `${change}%`,
        isPositive: changePercentage >= 0,
      },
    ]);
  }, [goldPrices, data, loading, filterDays]);

  const getTimeLabel = (days: number): string => {
    const labels: Record<number, string> = {
      7: "1 Week",
      14: "2 Weeks",
      30: "1 Month",
      180: "6 Months",
      365: "1 Year",
      1825: "5 Years",
    };
    return labels[days] || `${days} Days`;
  };

  return (
    <div>
      <div className="bg-white shadow-default rounded-2xl p-6 border border-gray-300 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-lg font-bold text-blue-500 dark:text-blue-500 mb-4">
          Gold Price Performance
        </h2>

        <ChartTab setFilterDays={setFilterDays} />

        <div className="overflow-x-auto mt-4">
          {liveLoading && <p>Loading latest gold prices...</p>}
          {liveError && <p>Error: {liveError}</p>}
          {!liveLoading && !liveError && performanceData.length > 0 && (
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between px-4 font-semibold mb-2">
                <span className="w-1/3 text-left">Time Period</span>
                <span className="w-1/3 text-center">Price Diff</span>
                <span className="w-1/3 text-right">Change</span>
              </div>
              <hr className="my-2 border-gray-300 dark:border-gray-600" />

              {performanceData.map(({ period, priceDiff, change, isPositive }) => (
                <div key={period} className="py-3">
                  <div className="flex justify-between px-4">
                    <span className="w-1/3 text-left">{period}</span>
                    <span className="w-1/3 text-center">${priceDiff}</span>
                    <span className={`w-1/3 text-right font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                      {change}
                    </span>
                  </div>
                  <hr className="my-2 border-gray-300 dark:border-gray-600" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlyTarget;
