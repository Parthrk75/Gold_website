"use client";
import { useState, useEffect } from "react";

// ✅ Define types at the top
export type GoldData = {
  date: string;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
};



type ETFData = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
};

type StockData = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
};

// ✅ Hook 1: Fetch Gold Data Based on Filter (7, 14, 30 days, etc.)
export function useGoldData(filterDays: number = 7) {
  const [data, setData] = useState<GoldData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGoldData() {
      try {
        setLoading(true);

        const today = new Date();
        const startDate = new Date();
        startDate.setDate(today.getDate() - filterDays);

        const params = new URLSearchParams({
          startDate: startDate.toISOString().split("T")[0],
          endDate: today.toISOString().split("T")[0],
          interval: "1d",
        });

        const response = await fetch(`/api/historical-data?${params.toString()}`);
        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();
        setData(result.historicalData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchGoldData();
  }, [filterDays]);

  return { data, loading, error };
}

// ✅ Hook 2: Fetch Gold Data Based on Custom Start & End Dates
export function useCustomGoldData(startDate: string, endDate: string) {
  const [data, setData] = useState<GoldData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGoldData() {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          startDate,
          endDate,
          interval: "1d",
        });

        const response = await fetch(`/api/historical-data?${params.toString()}`);
        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();
        setData(result.historicalData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchGoldData();
  }, [startDate, endDate]);

  return { data, loading, error };
}

// ✅ Hook 3: Fetch Live Gold Price
export const useLiveGoldPrice = () => {
  const [goldPrices, setGoldPrices] = useState<{ [key: string]: number | null }>({
    "24K": null,
    "22K": null,
    "18K": null,
    "14K": null,
  });
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch("/api/gold-price");
        const data = await response.json();

        const price24K = data.price; // 24K gold price from API
        const calculatedPrices = {
          "24K": price24K,
          "22K": (22 / 24) * price24K,
          "18K": (18 / 24) * price24K,
          "14K": (14 / 24) * price24K,
        };

        setGoldPrices(calculatedPrices);
        setUpdatedAt(data.updatedAt);
      } catch (error) {
        console.error("Failed to fetch gold price:", error);
        setError("Failed to fetch gold price.");
      }
      finally {
        setLoading(false);
      }
    };

    fetchGoldPrice();
  }, []);

  return { goldPrices, updatedAt, loading, error };
};



// ✅ Hook 4: Fetch Gold ETF Data
export function useGoldETFs() {
  const [etfData, setEtfData] = useState<ETFData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("/api/gold-etf");
        const data = await response.json();

        if (!response.ok) throw new Error("Failed to fetch ETF data");

        setEtfData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { etfData, loading, error };
}

// ✅ Hook 5: Fetch Gold Mining Stocks
export function useGoldMiningStocks() {
  const [stockData, setStockData] = useState<StockData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStockData() {
      try {
        setLoading(true);
        const response = await fetch("/api/gold-stocks");

        if (!response.ok) throw new Error("Failed to fetch stock data");

        const data = await response.json();
        setStockData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchStockData();
  }, []);

  return { stockData, loading, error };
}
