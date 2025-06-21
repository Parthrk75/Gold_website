// import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";

// const AppHeader = () => {

  
//   return (
//     <header className="sticky top-0 flex w-full bg-white border-b border-gray-200 z-50 dark:border-gray-800 dark:bg-gray-900">
//       <div className="flex items-center justify-between w-full px-4 py-3 md:px-6 lg:px-8">
        
//         {/* Left Section: Sidebar Toggle + Website Name */}
//         <div className="flex items-center gap-3">
//           {/* Sidebar Toggle Button */}
         

//           {/* Website Name - Left Aligned & Responsive */}
//           <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-300 bg-clip-text drop-shadow-lg">
//             TodayGoldPrices
//           </h1>
//         </div>

//         {/* Right Section: Theme Toggle Button */}
//         <div className="flex items-center">
//           <ThemeToggleButton />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default AppHeader;


import Link from "next/link";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";

const AppHeader = () => {
  return (
    <header className="sticky top-0 flex w-full bg-white border-b border-gray-200 z-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between w-full px-4 py-3 md:px-6 lg:px-8">
        
        {/* Left Section: Website Name */}
        <div className="flex items-center gap-3">
          {/* Clickable Website Name to Navigate to Home */}
          <Link href="/" passHref>
            <h1 className="cursor-pointer text-lg sm:text-xl md:text-2xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-300 bg-clip-text drop-shadow-lg">
              TodayGoldPrices
            </h1>
          </Link>
        </div>

        {/* Right Section: Blog Button + Theme Toggle */}
        <div className="flex items-center gap-4">
          {/* Blog Button */}
          <Link href="/blog" passHref>
            <button className="text-sm font-semibold text-gray-700 hover:text-yellow-600 dark:text-gray-200 dark:hover:text-yellow-400 transition-colors">
              Blog
            </button>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
