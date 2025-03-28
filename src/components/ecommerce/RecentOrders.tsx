'use client';

import { useGoldETFs } from "@/hooks/goldPriceFetcher";

export default function RecentOrders() {
  // Use the custom hook to fetch ETF data
  const { etfData, loading, error } = useGoldETFs();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function to determine text color based on change value
  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="rounded-2xl border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 p-6">
      {/* Title */}
      <h2 className="text-lg font-bold text-blue-500 dark:text-blue-500 mb-6">
        Gold ETF Performance
      </h2>
      {/* Header Row */}
      <div className="flex justify-between px-6 font-semibold mb-4">
        <span className="w-1/3 text-left">Symbol</span>
        <span className="w-1/3 text-center">Price</span>
        <span className="w-1/3 text-right">Changes</span>
      </div>
      <hr className="my-4 border-gray-300 dark:border-gray-600" />

      {/* Data Rows */}
      {etfData.map((etf) => (
        <div key={etf.symbol} className="">
          <div className="flex justify-between px-6">
            <span className="w-1/3 text-left">{etf.symbol}</span>
            <span className="w-1/3 text-center">${etf.price}</span>
            <span className={`w-1/3 text-right font-semibold ${getChangeColor(etf.change)}`}>
              {etf.change.toFixed(2)} ({etf.changePercent.toFixed(2)}%)
            </span>
          </div>
          <hr className="my-2 border-gray-300 dark:border-gray-600" />
        </div>
      ))}
    </div>
  );
}
