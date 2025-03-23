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
    <div className="rounded-2xl border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 p-6">
      <h2 className="text-lg font-bold text-blue-500 dark:text-blue-500 mb-6">
        Gold Mining Stock Performance
      </h2>
      <div className="flex justify-between px-6 font-semibold mb-2">
        <span className="w-1/3 text-left">Symbol</span>
        <span className="w-1/3 text-center">Price</span>
        <span className="w-1/3 text-right">Changes</span>
      </div>
      <hr className="my-2 border-gray-300 dark:border-gray-600" />

      {stockData &&
        stockData.map((stock) => (
          <div key={stock.symbol}>
            <div className="flex justify-between px-6">
              <span className="w-1/3 text-left">{stock.symbol}</span>
              <span className="w-1/3 text-center">${stock.price.toFixed(2)}</span>
              <span
                className={`w-1/3 text-right font-semibold ${
                  stock.change >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </span>
            </div>
            <hr className="my-4 border-gray-300 dark:border-gray-600" />
          </div>
        ))}
    </div>
  );
};

export default DemographicCard;
