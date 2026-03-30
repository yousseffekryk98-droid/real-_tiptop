import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const THEME_PRESETS = {
  gold: {
    name: "Gold (Default)",
    hex: "#c8a96e",
    accent: "#b8914a",
    dim: "rgba(200,169,110,0.10)"
  },
  emerald: {
    name: "Emerald",
    hex: "#16a34a",
    accent: "#15803d",
    dim: "rgba(22,163,74,0.10)"
  },
  navy: {
    name: "Deep Navy",
    hex: "#1e40af",
    accent: "#1e3a8a",
    dim: "rgba(30,64,175,0.10)"
  },
  rose: {
    name: "Rose Gold",
    hex: "#d946a6",
    accent: "#be185d",
    dim: "rgba(217,70,166,0.10)"
  },
  teal: {
    name: "Teal",
    hex: "#0d9488",
    accent: "#115e59",
    dim: "rgba(13,148,136,0.10)"
  },
  plum: {
    name: "Plum",
    hex: "#7c3aed",
    accent: "#6d28d9",
    dim: "rgba(124,58,237,0.10)"
  }
};

export const BG_MODES = {
  light: { name: "Light", bg: "#fdfaf5", surface: "#fff" },
  beige: { name: "Beige", bg: "#f5f1ed", surface: "#faf8f5" },
  dark: { name: "Dark", bg: "#1a1816", surface: "#2a2824" }
};

export function ThemeProvider({ children }) {
  const [primaryColor, setPrimaryColor] = useState("gold");
  const [bgMode, setBgMode] = useState("light");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("tiptop_theme");
    if (saved) {
      const { color, mode } = JSON.parse(saved);
      setPrimaryColor(color);
      setBgMode(mode);
    }
  }, []);

  // Save to localStorage and update CSS variables
  useEffect(() => {
    localStorage.setItem("tiptop_theme", JSON.stringify({ color: primaryColor, mode: bgMode }));
    
    const theme = THEME_PRESETS[primaryColor] || THEME_PRESETS.gold;
    const bgTheme = BG_MODES[bgMode] || BG_MODES.light;
    
    document.documentElement.style.setProperty("--primary-gold", theme.hex);
    document.documentElement.style.setProperty("--primary-accent", theme.accent);
    document.documentElement.style.setProperty("--primary-dim", theme.dim);
    document.documentElement.style.setProperty("--bg-primary", bgTheme.bg);
    document.documentElement.style.setProperty("--bg-surface", bgTheme.surface);
  }, [primaryColor, bgMode]);

  const value = {
    primaryColor,
    setPrimaryColor,
    bgMode,
    setBgMode,
    currentTheme: THEME_PRESETS[primaryColor] || THEME_PRESETS.gold,
    currentBgMode: BG_MODES[bgMode] || BG_MODES.light
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
