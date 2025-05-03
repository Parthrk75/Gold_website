import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";

import DemographicCard from "@/components/ecommerce/DemographicCard";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import LatestPosts from "@/components/ecommerce/LatestPosts";

export const metadata: Metadata = {
  title: "Live Gold Prices & Charts | TodayGoldPrices.org",
  description: "Track live gold prices, historical trends, and gold price charts in various currencies. Get the latest updates on 24K, 22K, and 18K gold rates.",
  keywords: "gold price, live gold prices, gold rate today, gold chart, gold price history, gold prices in USD, 24K gold price, 22K gold price, 18K gold price",
  authors: [{ name: "TodayGoldPrices.org", url: "https://www.todaygoldprices.org/" }],
  openGraph: {
    title: "Live Gold Prices & Charts | TodayGoldPrices.org",
    description: "Check real-time gold prices, historical charts, and latest market trends for 24K, 22K, and 18K gold.",
    url: "https://www.todaygoldprices.org/",
    siteName: "TodayGoldPrices.org",
    images: [{ url: "/images/gold-chart.jpg", width: 1200, height: 630, alt: "Gold Price Chart" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@TodayGoldPrices",
    title: "Live Gold Prices & Charts | TodayGoldPrices.org",
    description: "Track gold prices live, view historical trends, and access gold price charts in multiple currencies.",
    images: "/images/gold-chart.jpg",
  },
};


export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />

      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-6">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-6">
        <RecentOrders/>
      </div>
      <div className="col-span-12">
        <LatestPosts/>
      </div>
      
    </div>
  );
}



