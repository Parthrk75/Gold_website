"use client";
// import Image from "next/image";

// import CountryMap from "./CountryMap";
// import { useState } from "react";
// import { MoreDotIcon } from "@/icons";
// import { Dropdown } from "../ui/dropdown/Dropdown";
// import { DropdownItem } from "../ui/dropdown/DropdownItem";

// export default function DemographicCard() {
//   const [isOpen, setIsOpen] = useState(false);

//   function toggleDropdown() {
//     setIsOpen(!isOpen);
//   }

//   function closeDropdown() {
//     setIsOpen(false);
//   }

//   return (
//     <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
//       <div className="flex justify-between">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//             Customers Demographic
//           </h3>
//           <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
//             Number of customer based on country
//           </p>
//         </div>

//         <div className="relative inline-block">
//           <button onClick={toggleDropdown} className="dropdown-toggle">
//             <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
//           </button>
//           <Dropdown
//             isOpen={isOpen}
//             onClose={closeDropdown}
//             className="w-40 p-2"
//           >
//             <DropdownItem
//               onItemClick={closeDropdown}
//               className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
//             >
//               View More
//             </DropdownItem>
//             <DropdownItem
//               onItemClick={closeDropdown}
//               className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
//             >
//               Delete
//             </DropdownItem>
//           </Dropdown>
//         </div>
//       </div>
//       <div className="px-4 py-6 my-6 overflow-hidden border border-gary-200 rounded-2xl bg-gray-50 dark:border-gray-800 dark:bg-gray-900 sm:px-6">
//         <div
//           id="mapOne"
//           className="mapOne map-btn -mx-4 -my-6 h-[212px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px] 2xl:w-[554px]"
//         >
//           <CountryMap />
//         </div>
//       </div>

//       <div className="space-y-5">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="items-center w-full rounded-full max-w-8">
//               <Image
//                 width={48}
//                 height={48}
//                 src="/images/country/country-01.svg"
//                 alt="usa"
//                 className="w-full"
//               />
//             </div>
//             <div>
//               <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
//                 USA
//               </p>
//               <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
//                 2,379 Customers
//               </span>
//             </div>
//           </div>

//           <div className="flex w-full max-w-[140px] items-center gap-3">
//             <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
//               <div className="absolute left-0 top-0 flex h-full w-[79%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"></div>
//             </div>
//             <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
//               79%
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="items-center w-full rounded-full max-w-8">
//               <Image
//                 width={48}
//                 height={48}
//                 className="w-full"
//                 src="/images/country/country-02.svg"
//                 alt="france"
//               />
//             </div>
//             <div>
//               <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
//                 France
//               </p>
//               <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
//                 589 Customers
//               </span>
//             </div>
//           </div>

//           <div className="flex w-full max-w-[140px] items-center gap-3">
//             <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
//               <div className="absolute left-0 top-0 flex h-full w-[23%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"></div>
//             </div>
//             <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
//               23%
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useGoldMiningStocks } from '@/hooks/goldPriceFetcher';
import React from 'react';
const  DemographicCard = () => {
  const { stockData, loading, error } = useGoldMiningStocks();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="rounded-2xl border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 p-6">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Gold Mining Stock Performance</h2>
      <div className="flex justify-between px-6 font-semibold mb-2">
        <span className="w-1/3 text-left">Symbol</span>
        <span className="w-1/3 text-center">Price</span>
        <span className="w-1/3 text-right">Changes</span>
      </div>
      <hr className="my-2 border-gray-300 dark:border-gray-600" />
      {stockData && stockData.map((stock) => (
        <div key={stock.symbol} className="">
          <div className="flex justify-between px-6">
            <span className="w-1/3 text-left">{stock.symbol}</span>
            <span className="w-1/3 text-center">${stock.price}</span>
            <span className="w-1/3 text-right">
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
