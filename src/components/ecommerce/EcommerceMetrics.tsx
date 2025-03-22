"use client";
import React, { useState, useEffect } from "react";
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { useLiveGoldPrice } from "@/hooks/goldPriceFetcher";

interface GoldPrices {
  [karat: string]: number;
}

export const EcommerceMetrics = () => {
  const { goldPrices, loading, error } = useLiveGoldPrice();
  const [previousPrices, setPreviousPrices] = useState<GoldPrices>({});
  const [highlightedKarat, setHighlightedKarat] = useState<string | null>(null);

  useEffect(() => {
    if (goldPrices) {
      setPreviousPrices((prev) => {
        const updatedPrices: GoldPrices = {};
        Object.keys(goldPrices).forEach((karat) => {
          if (prev[karat] !== goldPrices[karat]) {
            setHighlightedKarat(karat); // Highlight this karat
            setTimeout(() => setHighlightedKarat(null), 5000); // Remove highlight after 5 seconds
          }
          updatedPrices[karat] = goldPrices[karat] ?? prev[karat] ?? 0;
        });
        return updatedPrices;
      });
    }
  }, [goldPrices]);

  if (loading) return <p className="text-center text-gray-500">Loading gold prices...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
        {["24K", "22K", "18K", "14K"].map((karat) => {
          const price = goldPrices?.[karat] ?? 0;
          const prevPrice = previousPrices?.[karat] ?? price;
          const priceChange = price - prevPrice;
          const isIncreased = priceChange > 0;

          const shadowColor =
            highlightedKarat === karat
              ? isIncreased
                ? "shadow-green-500"
                : "shadow-red-500"
              : "shadow-gray-300"; // Reset to default after 5 seconds

          return (
            <div
              key={karat}
              className={`rounded-2xl border border-gray-200 p-5 dark:border-gray-800 md:p-6 shadow-md transition-all ${shadowColor}`}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Gold Price ({karat})</span>
                {priceChange !== 0 && (
                  <span className={`flex items-center gap-1 text-sm font-medium ${isIncreased ? "text-green-600" : "text-red-600"}`}>
                    {isIncreased ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  </span>
                )}
              </div>
              <h4 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">${price.toFixed(2)}</h4>
            </div>
          );
        })}
      </div>

      {/* Alert Banner */}
      <div className="w-full rounded-2xl bg-yellow-100 border-l-4 border-yellow-500 mt-8 p-4 dark:bg-yellow-900 dark:border-yellow-600">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">Gold Market Closed on Weekends</h3>
            <p className="text-yellow-700 dark:text-yellow-400 mt-1">
              Gold prices remain unchanged on Saturday and Sunday, as the market is closed on weekends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
