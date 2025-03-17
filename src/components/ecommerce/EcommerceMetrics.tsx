"use client";
import React from "react";
import { AlertTriangle } from "lucide-react";
import { useLiveGoldPrice } from "@/hooks/goldPriceFetcher";

export const EcommerceMetrics = () => {
  const { goldPrices, loading, error } = useLiveGoldPrice();

  if (loading) return <p className="text-center text-gray-500">Loading gold prices...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div>
      {/* Gold Price Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {["24K", "22K", "18K", "14K"].map((karat) => (
          <div key={karat} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="mt-5">
              <span className="text-sm text-gray-500 dark:text-gray-400">Gold Price ({karat})</span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                ${goldPrices?.[karat]?.toFixed(2) || "N/A"}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Alert Banner */}
      <div className="w-full rounded-2xl bg-[#FEF9C3] border-l-4 border-[#CA8A04] mt-8 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-[#CA8A04] mt-0.5" />
          <div>
            <h3 className="font-medium text-[#B45309]">Gold Market Closed on Weekends</h3>
            <p className="text-[#B45309] mt-1">
              Gold prices remain unchanged on Saturday and Sunday, as the market is closed on weekends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
