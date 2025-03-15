import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Extract query parameters
    const startDate = searchParams.get("startDate") || "2020-01-01"; // Default if missing
    const endDate = searchParams.get("endDate") || new Date().toISOString().split("T")[0];
    const interval = searchParams.get("interval") as "1d" | "1wk" | "1mo" || "1d";

    const symbol = "GLD"; // Gold ETF symbol
    const queryOptions = { period1: startDate, period2: endDate, interval };

    // Fetch historical data
    const rawData = await yahooFinance.historical(symbol, queryOptions);

    if (!rawData || rawData.length === 0) {
      return NextResponse.json({ error: "No historical data available" }, { status: 404 });
    }

    // ✅ Apply the scaling factor and round to 2 decimal places
    const scalingFactor = 10.77;
    const formatNumber = (num: number | null) =>
      num !== null ? parseFloat((num * scalingFactor).toFixed(2)) : null;

    // ✅ Ensure only dates within the requested range are returned
    const formattedData = rawData
      .filter((entry) => {
        const entryDate = new Date(entry.date).toISOString().split("T")[0];
        return entryDate >= startDate && entryDate <= endDate;
      })
      .map((entry) => ({
        date: entry.date,
        open: formatNumber(entry.open),
        high: formatNumber(entry.high),
        low: formatNumber(entry.low),
        close: formatNumber(entry.close),
        volume: entry.volume ?? null,
      }));

    return NextResponse.json({ historicalData: formattedData });
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return NextResponse.json({ error: "Failed to fetch historical data" }, { status: 500 });
  }
}
