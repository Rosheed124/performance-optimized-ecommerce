"use client";

// Import React hooks
import React, { createContext, useContext, useEffect, useState } from "react";

// Theme types
type Theme = "light" | "dark";

// Context properties interface
interface ThemeContextType {
  // Current active theme
  theme: Theme;
  // Function to toggle between themes
  toggleTheme: () => void;
}

// Create React context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider component wrapping the application
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Current theme state (defaults to dark)
  const [theme, setTheme] = useState<Theme>("dark");

  // Read saved preference from browser on initial mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("apexstore-theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Default to dark theme
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Handler to toggle between dark and light
  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("apexstore-theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Always render ThemeContext.Provider so SSR and prerender never see undefined
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to consume theme easily
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
