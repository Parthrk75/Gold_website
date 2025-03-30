"use client";
import { useGoldMiningStocks } from "@/hooks/goldPriceFetcher";
import React from "react";

const DemographicCard = () => {
  const { stockData, loading, error } = useGoldMiningStocks();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="rounded-3xl border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 p-8 shadow-2xl dark:shadow-gray-900/50 backdrop-blur-md bg-white/50 dark:bg-gray-900/40 transition-all duration-300">
      {/* Title */}
      <h2 className="text-xl font-extrabold text-transparent bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-300 bg-clip-text mb-6">
        Gold Stock 
      </h2>

      {/* Header Row */}
      <div className="flex justify-between px-6 font-semibold text-gray-900 dark:text-gray-100 mb-4">
        <span className="w-1/3 text-left">Symbol</span>
        <span className="w-1/3 text-center">Price</span>
        <span className="w-1/3 text-right">Changes</span>
      </div>
      <hr className="my-4 border-gray-300 dark:border-gray-600" />

      {/* Data Rows */}
      {stockData &&
        stockData.map((stock) => (
          <div key={stock.symbol} className="hover:bg-gray-200 dark:hover:bg-gray-800/50 transition-all duration-200 rounded-xl p-2">
            <div className="flex justify-between px-6">
              <span className="w-1/3 text-left">{stock.symbol}</span>
              <span className="w-1/3 text-center font-semibold">${stock.price.toFixed(2)}</span>
              <span
                className={`w-1/3 text-right font-semibold ${
                  stock.change >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </span>
            </div>
            <hr className="my-2 border-gray-300 dark:border-gray-600" />
          </div>
        ))}
    </div>
  );
};

export default DemographicCard;
