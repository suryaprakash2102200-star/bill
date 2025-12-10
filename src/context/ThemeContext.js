"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Provide a safe default value to prevent destructuring errors
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(systemTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Update HTML attribute and local storage
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Prevent hydration mismatch by rendering children only after mount, 
  // BUT we must render the Provider always to avoid context errors.
  // Actually, for a portfolio, rendering with default light theme first is acceptable 
  // to ensure SEO content is present. The flash is managed by the layout attributes.
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
