"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { Sun, Moon } from "lucide-react";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [heading, setHeading] = useState<string>("Dashboard");
  const [time, setTime] = useState<Date>(new Date());
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const routeMap: Record<string, string> = {
      "/dashboard": "Dashboard",
      "/strategy": "Strategy",
      "/trades": "Trades",
      "/pricing": "Pricing",
      "/settings": "Settings",
    };
    const currentTitle = routeMap[pathname] || "Dashboard";
    setHeading(currentTitle);
  }, [pathname]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  const formattedDate = time.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = time.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="w-full flex justify-between items-center px-6 py-4 border-b bg-white dark:bg-[#1E293B] shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{heading}</h1>

      <div className="flex items-center gap-6">
        {/* Date & Time */}
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
          <CalendarDays size={20} />
          <span>{formattedDate}, {formattedTime}</span>
        </div>

        {/* Custom Toggle */}
        <div
          className="w-[90px] h-[50px] bg-[#f5f7fa] dark:bg-[#2e3551] rounded-full flex items-center justify-between px-1 cursor-pointer transition-all duration-300"
          onClick={toggleTheme}
        >
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
              !isDark ? "bg-[#1E293B] text-white" : ""
            }`}
          >
            <Sun size={22} />
          </div>
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
              isDark ? "bg-[#1E293B] text-white" : ""
            }`}
          >
            <Moon size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


