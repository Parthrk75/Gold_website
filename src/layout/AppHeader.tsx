import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";

const AppHeader = () => {

  
  return (
    <header className="sticky top-0 flex w-full bg-white border-b border-gray-200 z-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between w-full px-4 py-3 md:px-6 lg:px-8">
        
        {/* Left Section: Sidebar Toggle + Website Name */}
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle Button */}
         

          {/* Website Name - Left Aligned & Responsive */}
          <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-300 bg-clip-text drop-shadow-lg">
            TodayGoldPrices
          </h1>
        </div>

        {/* Right Section: Theme Toggle Button */}
        <div className="flex items-center">
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
