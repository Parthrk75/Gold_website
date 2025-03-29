"use client";
import { useGoldDataDownload } from "@/hooks/goldPriceFetcher";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GoldEtf = () => {
  const { startDate, setStartDate, endDate, setEndDate, data, loading, error, downloadExcel } =
    useGoldDataDownload();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-300 bg-clip-text mb-6">
  Gold Price Data
</h2>

      {/* Date Selection */}
      <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300 font-semibold mb-1">📅 Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => {
              if (date && (!endDate || date <= endDate)) {
                setStartDate(date);
              } else {
                alert("Start date cannot be after the end date.");
              }
            }}
            maxDate={endDate || new Date()}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select start date"
            className="border px-4 py-2 rounded-lg shadow-sm w-48 text-gray-800 dark:text-white bg-white dark:bg-gray-800 hover:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300 font-semibold mb-1">📅 End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => {
              if (date && (!startDate || date >= startDate)) {
                setEndDate(date);
              } else {
                alert("End date cannot be before the start date.");
              }
            }}
            minDate={startDate || undefined}
            maxDate={new Date()}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select end date"
            className="border px-4 py-2 rounded-lg shadow-sm w-48 text-gray-800 dark:text-white bg-white dark:bg-gray-800 hover:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Status Messages */}
      {!startDate || !endDate ? (
        <p className="text-yellow-600 dark:text-yellow-400 text-center font-semibold">⚠️ Please select both start and end dates to fetch data.</p>
      ) : loading ? (
        <p className="text-blue-500 dark:text-blue-400 text-center font-semibold">🔄 Loading data...</p>
      ) : error ? (
        <p className="text-red-500 dark:text-red-400 text-center font-semibold">❌ {error}</p>
      ) : data.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-center font-semibold">📉 No data available for the selected date range.</p>
      ) : (
        <>
          {/* Download Button */}
          <div className="text-center my-6">
            <button
              onClick={downloadExcel}
              disabled={loading || data.length === 0}
              className="px-6 py-3 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              ⬇️ Download Excel
            </button>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">
                  <th className="px-5 py-3 text-left">📅 Date</th>
                  <th className="px-5 py-3 text-left">📈 Open</th>
                  <th className="px-5 py-3 text-left">🔝 High</th>
                  <th className="px-5 py-3 text-left">🔻 Low</th>
                  <th className="px-5 py-3 text-left">📉 Close</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className={`border-b dark:border-gray-700 ${index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-800"} hover:bg-gray-200 dark:hover:bg-gray-700`}>
                    <td className="px-5 py-3 text-gray-900 dark:text-white">{item.date || "N/A"}</td>
                    <td className="px-5 py-3 text-gray-900 dark:text-white">{item.open ?? "N/A"}</td>
                    <td className="px-5 py-3 text-gray-900 dark:text-white">{item.high ?? "N/A"}</td>
                    <td className="px-5 py-3 text-gray-900 dark:text-white">{item.low ?? "N/A"}</td>
                    <td className="px-5 py-3 text-gray-900 dark:text-white">{item.close ?? "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default GoldEtf;
