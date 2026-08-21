"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isSystem: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
  isSystem: true,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [isSystem, setIsSystem] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let initialTheme: Theme = "dark";
    try {
      const saved = localStorage.getItem("theme") as Theme | null;
      if (saved === "light" || saved === "dark") {
        initialTheme = saved;
        setIsSystem(false);
      } else {
        // Automatically check user device OS preference
        const isSystemLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
        initialTheme = isSystemLight ? "light" : "dark";
        setIsSystem(true);
      }
    } catch (e) {
      initialTheme = "dark";
    }

    setThemeState(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);

    // Listen to device system theme changes in real-time
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleSystemChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem("theme");
      // If user hasn't explicitly overridden, follow device
      if (!saved) {
        const sysTheme: Theme = e.matches ? "light" : "dark";
        setThemeState(sysTheme);
        applyTheme(sysTheme);
        setIsSystem(true);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemChange);
      return () => mediaQuery.removeEventListener("change", handleSystemChange);
    }
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
      root.setAttribute("data-theme", "light");
      root.style.colorScheme = "light";
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      root.style.colorScheme = "dark";
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    setIsSystem(false);
    try {
      localStorage.setItem("theme", newTheme);
    } catch (e) {}
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isSystem }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399] ${
        isDark
          ? "bg-white/[0.06] hover:bg-white/[0.12] border-white/15 text-[#fbbf24] hover:text-[#fef08a] shadow-[0_0_15px_rgba(251,191,36,0.15)]"
          : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-indigo-600 hover:text-indigo-700 shadow-sm"
      } ${className}`}
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? (
        <Sun size={17} className="transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon size={17} className="transition-transform duration-300 -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
}
