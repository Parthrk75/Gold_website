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
    <div className="rounded-3xl border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 p-8 shadow-2xl dark:shadow-gray-900/50 backdrop-blur-md bg-white/50 dark:bg-gray-900/40 transition-all duration-300">
      {/* Title */}
      <h2 className="text-xl font-extrabold text-transparent bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-300 bg-clip-text mb-6">
        Gold ETF
      </h2>

      {/* Header Row */}
      <div className="flex justify-between px-6 font-semibold text-gray-900 dark:text-gray-100 mb-4">
        <span className="w-1/3 text-left">Symbol</span>
        <span className="w-1/3 text-center">Price</span>
        <span className="w-1/3 text-right">Changes</span>
      </div>
      <hr className="my-4 border-gray-300 dark:border-gray-600" />

      {/* Data Rows */}
      {etfData.map((etf) => (
        <div key={etf.symbol} className="hover:bg-gray-200 dark:hover:bg-gray-800/50 transition-all duration-200 rounded-xl p-2">
          <div className="flex justify-between px-6">
            <span className="w-1/3 text-left">{etf.symbol}</span>
            <span className="w-1/3 text-center font-semibold">${etf.price}</span>
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
