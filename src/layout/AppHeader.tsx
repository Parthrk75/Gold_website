import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import { useSidebar } from "@/context/SidebarContext";

const AppHeader = () => {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 991) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  return (
    <header className="sticky top-0 flex w-full bg-white border-b border-gray-200 z-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between w-full px-4 py-3 md:px-6 lg:px-8">
        
        {/* Left Section: Sidebar Toggle + Website Name */}
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle Button */}
          <button
            className="flex items-center justify-center w-10 h-10 text-gray-500 border border-gray-200 rounded-lg dark:border-gray-800 dark:text-gray-400 lg:h-11 lg:w-11"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? <span>&#10005;</span> : <span>&#9776;</span>}
          </button>

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
