import { useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./config/i18n";
import { I18nProvider } from "./contexts/I18nContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppInner } from "./App";
import { LandingPage } from "./pages/LandingPage";

export default function App() {
  // Simple auth state - check localStorage for admin session
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("adminSession") === "true";
  });

  const handleLogin = () => {
    localStorage.setItem("adminSession", "true");
    setIsAdmin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    setIsAdmin(false);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <I18nProvider>
        <ThemeProvider>
          {isAdmin ? (
            <AppInner onLogout={handleLogout} />
          ) : (
            <LandingPage onLoginClick={handleLogin} />
          )}
        </ThemeProvider>
      </I18nProvider>
    </I18nextProvider>
  );
}
