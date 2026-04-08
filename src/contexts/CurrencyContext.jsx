import { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

export const CURRENCY_RATES = {
  USD: { symbol: "$", rate: 1.0, label: "US Dollar" },
  EGP: { symbol: "EGP", rate: 30.5, label: "Egyptian Pound" },
  AED: { symbol: "د.إ", rate: 3.67, label: "UAE Dirham" },
  SAR: { symbol: "﷼", rate: 3.75, label: "Saudi Riyal" },
  QAR: { symbol: "ر.ق", rate: 3.64, label: "Qatari Riyal" }
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("EGP");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tiptop_currency");
    if (saved && CURRENCY_RATES[saved]) {
      setCurrency(saved);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tiptop_currency", currency);
  }, [currency]);

  const convertPrice = (priceInCents) => {
    const priceInBase = priceInCents / 100;
    const baseUSD = priceInBase / CURRENCY_RATES.EGP.rate;
    const converted = baseUSD * CURRENCY_RATES[currency].rate;
    return Math.round(converted * 100) / 100;
  };

  const formatPrice = (priceInCents) => {
    const converted = convertPrice(priceInCents);
    const rate = CURRENCY_RATES[currency];
    return `${rate.symbol} ${converted.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const value = {
    currency,
    setCurrency,
    convertPrice,
    formatPrice,
    rates: CURRENCY_RATES
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
