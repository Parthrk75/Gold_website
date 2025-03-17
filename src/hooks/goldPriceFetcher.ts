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

type GoldPriceResponse = {
  [x: string]: any;
  "24K": number;
  "22K": number;
  "18K": number;
  "14K": number;
  currency: string;
  timestamp: string;
  error?: string;
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

export function useGoldPrice() {
  const [goldPrices, setGoldPrices] = useState<GoldPriceResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [storedPrices, setStoredPrices] = useState<Record<"24K" | "22K" | "18K" | "14K", number> | null>(null);

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch("/api/gold-price");
        if (!response.ok) throw new Error("Failed to fetch gold prices");

        const data: GoldPriceResponse = await response.json();
        if (data.error) throw new Error(data.error);

        const price24K = data.price;
        const goldRates: GoldPriceResponse = {
          "24K": price24K,
          "22K": (22 / 24) * price24K,
          "18K": (18 / 24) * price24K,
          "14K": (14 / 24) * price24K,
          currency: data.currency || "USD",
          updatedAt: data.updatedAt || new Date().toISOString(),
          timestamp: "",
        };

        setGoldPrices(goldRates);
        setError(null);

        // Extract only the time part from the updated timestamp
        const updatedAtTime = new Date(goldRates.updatedAt).toISOString().split("T")[1];

        if (updatedAtTime.startsWith("00:05:00")) {
          setStoredPrices({
            "24K": goldRates["24K"],
            "22K": goldRates["22K"],
            "18K": goldRates["18K"],
            "14K": goldRates["14K"],
          });
        } else if (updatedAtTime.startsWith("00:00:00")) {
          setStoredPrices(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchGoldPrice();
    const intervalId = setInterval(fetchGoldPrice, 60000); // Auto-refresh every 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  return { goldPrices, storedPrices, loading, error };
}








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






// "use client";
// import { useState, useEffect } from "react";

// // ✅ Define Types
// export type GoldData = {
//   date: string;
//   open: number | null;
//   high: number | null;
//   low: number | null;
//   close: number | null;
//   volume: number | null;
// };

// type GoldPriceResponse = {
//   "24K": number;
//   "22K": number;
//   "18K": number;
//   "14K": number;
//   currency: string;
//   updatedAt?: string;
//   error?: string;
// };

// type ETFData = {
//   symbol: string;
//   price: number;
//   change: number;
//   changePercent: number;
// };

// type StockData = {
//   symbol: string;
//   name: string;
//   price: number;
//   change: number;
//   changePercent: number;
//   volume: number;
// };

// // ✅ Hook 1: Fetch Gold Data Based on Filter (7, 14, 30 days, etc.)
// export function useGoldData(filterDays: number = 7) {
//   const [data, setData] = useState<GoldData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchGoldData() {
//       try {
//         setLoading(true);

//         const today = new Date();
//         const startDate = new Date();
//         startDate.setDate(today.getDate() - filterDays);

//         const response = await fetch(`/api/historical-data?startDate=${startDate.toISOString().split("T")[0]}&endDate=${today.toISOString().split("T")[0]}&interval=1d`);
//         if (!response.ok) throw new Error("Failed to fetch data");

//         const result = await response.json();
//         if (!Array.isArray(result.historicalData)) throw new Error("Invalid data format");

//         setData(result.historicalData);
//         setError(null);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchGoldData();
//   }, [filterDays]);

//   return { data, loading, error };
// }

// // ✅ Hook 2: Fetch Gold Data Based on Custom Start & End Dates
// export function useCustomGoldData(startDate: string, endDate: string) {
//   const [data, setData] = useState<GoldData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchGoldData() {
//       try {
//         setLoading(true);

//         const response = await fetch(`/api/historical-data?startDate=${startDate}&endDate=${endDate}&interval=1d`);
//         if (!response.ok) throw new Error("Failed to fetch data");

//         const result = await response.json();
//         if (!Array.isArray(result.historicalData)) throw new Error("Invalid data format");

//         setData(result.historicalData);
//         setError(null);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchGoldData();
//   }, [startDate, endDate]);

//   return { data, loading, error };
// }

// // ✅ Hook 3: Fetch Live Gold Price
// export function useGoldPrice() {
//   const [goldPrices, setGoldPrices] = useState<GoldPriceResponse | null>(null);
//   const [storedPrices, setStoredPrices] = useState<Partial<GoldPriceResponse> | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchGoldPrice() {
//       try {
//         setLoading(true);
//         const response = await fetch("/api/gold-price");
//         if (!response.ok) throw new Error("Failed to fetch gold prices");

//         const data = await response.json();
//         if (data.error) throw new Error(data.error);

//         const price24K = data["24K"];
//         const goldRates: GoldPriceResponse = {
//           "24K": price24K,
//           "22K": (22 / 24) * price24K,
//           "18K": (18 / 24) * price24K,
//           "14K": (14 / 24) * price24K,
//           currency: data.currency || "USD",
//           updatedAt: data.updatedAt || new Date().toISOString(),
//         };

//         setGoldPrices(goldRates);
//         setError(null);

//         // Extract only the time from updated timestamp
//         const updatedAtTime = goldRates.updatedAt
//         ? new Date(goldRates.updatedAt).toISOString().split("T")[1]
//         : "";
      
//         if (updatedAtTime.startsWith("00:05:00")) {
//           setStoredPrices({ "24K": goldRates["24K"], "22K": goldRates["22K"], "18K": goldRates["18K"], "14K": goldRates["14K"] });
//         } else if (updatedAtTime.startsWith("00:00:00")) {
//           setStoredPrices(null);
//         }
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchGoldPrice();
//     const intervalId = setInterval(fetchGoldPrice, 60000); // Auto-refresh every 60 seconds

//     return () => clearInterval(intervalId);
//   }, []);

//   return { goldPrices, storedPrices, loading, error };
// }

// // ✅ Hook 4: Fetch Gold ETF Data
// export function useGoldETFs() {
//   const [etfData, setEtfData] = useState<ETFData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setLoading(true);
//         const response = await fetch("/api/gold-etf");
//         if (!response.ok) throw new Error("Failed to fetch ETF data");

//         const data = await response.json();
//         if (!Array.isArray(data)) throw new Error("Invalid data format");

//         setEtfData(data);
//         setError(null);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   return { etfData, loading, error };
// }

// // ✅ Hook 5: Fetch Gold Mining Stocks
// export function useGoldMiningStocks() {
//   const [stockData, setStockData] = useState<StockData[] | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchStockData() {
//       try {
//         setLoading(true);
//         const response = await fetch("/api/gold-stocks");
//         if (!response.ok) throw new Error("Failed to fetch stock data");

//         const data = await response.json();
//         if (!Array.isArray(data)) throw new Error("Invalid data format");

//         setStockData(data);
//         setError(null);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchStockData();
//   }, []);

//   return { stockData, loading, error };
// }
