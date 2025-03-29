"use client";

import { useState, useEffect } from "react";
import { useLiveGoldPrice, useGoldData } from "@/hooks/goldPriceFetcher";
import ChartTab from "../common/ChartTab";

const TIME_LABELS: Record<number, string> = {
  7: "1 Week",
  14: "2 Weeks",
  30: "1 Month",
  180: "6 Months",
  365: "1 Year",
  1825: "5 Years",
};

const MonthlyTarget = () => {
  const { goldPrices, loading: liveLoading, error: liveError } = useLiveGoldPrice();
  const [filterDays, setFilterDays] = useState(7);
  const { data, loading } = useGoldData(filterDays);
  const [performanceData, setPerformanceData] = useState<{ period: string; priceDiff: number; change: number; isPositive: boolean } | null>(null);

  useEffect(() => {
    if (loading || !goldPrices || !data?.length) return;

    const oldPrice = data[0]?.close ?? 0;
    const newPrice = goldPrices["24K"] ?? 0;
    if (!oldPrice || !newPrice) return;

    const priceDiff = newPrice - oldPrice;
    const change = (priceDiff / oldPrice) * 100;

    setPerformanceData({
      period: TIME_LABELS[filterDays] || `${filterDays} Days`,
      priceDiff,
      change,
      isPositive: change >= 0,
    });
  }, [goldPrices, data, loading, filterDays]);

  return (
    <div className="rounded-3xl border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 p-8 shadow-lg dark:shadow-md backdrop-blur-md bg-white/50 dark:bg-gray-900/40 transition-all duration-300">

      {/* Title */}
      <h2 className="text-xl font-extrabold text-transparent bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-300 bg-clip-text mb-6">
        Gold Price Performance
      </h2>

      <ChartTab setFilterDays={setFilterDays} />

      <div className="mt-4">
        {liveLoading && <p>Loading latest gold prices...</p>}
        {liveError && <p>Error: {liveError}</p>}
        {performanceData && (
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between px-6 font-semibold mb-2">
              <span className="w-1/3 text-left">Time Period</span>
              <span className="w-1/3 text-center">Price Diff</span>
              <span className="w-1/3 text-right">Change</span>
            </div>
            <hr className="my-2 border-gray-300 dark:border-gray-600" />

            <div className="py-3 hover:bg-gray-200 dark:hover:bg-gray-800/50 transition-all duration-200 rounded-xl p-2">
              <div className="flex justify-between px-6">
                <span className="w-1/3 text-left">{performanceData.period}</span>
                <span className="w-1/3 text-center">${performanceData.priceDiff.toFixed(2)}</span>
                <span className={`w-1/3 text-right font-semibold ${performanceData.isPositive ? "text-green-500" : "text-red-500"}`}>
                  {performanceData.change.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyTarget;
