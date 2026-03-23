import { useState } from "react";
import { useTranslation } from "./contexts/I18nContext";
import { T, AF } from "./config/tokens";
import { INITIAL_PRODUCTS } from "./config/constants";
import { GlobalStyles } from "./styles/global";
import { FontLink } from "./components/shared/UI";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { DashboardPage } from "./pages/DashboardPage";
import { CatalogPage } from "./pages/CatalogPage";
import { AddProductPage } from "./pages/AddProductPage";
import { CheckoutPanel } from "./pages/CheckoutPage";
import { OrdersPage } from "./pages/OrdersPage";
import { LandingPage } from "./pages/LandingPage";
import { LandingPageEditor } from "./components/LandingPageEditor";

export function AppInner({ onLogout }) {
  const { t, lang, isRTL, changeLanguage } = useTranslation();
  const af = isRTL ? AF : T.sans;
  const sf = isRTL ? AF : T.serif;

  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState(
    INITIAL_PRODUCTS.map((p) => ({
      ...p,
      variants: [...p.variants.map((v) => ({ ...v }))]
    }))
  );

  const NAV = [
    { id: "dashboard", label: t("nav.dashboard"), icon: "▦", group: "main" },
    { id: "catalog", label: t("nav.catalog"), icon: "◈", group: "main" },
    { id: "add", label: t("nav.add"), icon: "⊕", group: "main" },
    { id: "landing", label: t("nav.landing"), icon: "🌐", group: "main" },
    { id: "orders", label: t("nav.orders"), icon: "⊟", group: "ops" },
    { id: "settings", label: t("nav.settings"), icon: "⚙", group: "ops" },
    { id: "checkout", label: t("nav.checkout"), icon: "🛒", group: "ops" }
  ];

  const mainNav = NAV.filter((n) => n.group === "main");
  const opsNav = NAV.filter((n) => n.group === "ops");

  const handleAddSaved = (prod) => {
    setProducts((prev) => [...prev, prod]);
    setPage("catalog");
  };

  return (
    <>
      <FontLink />
      <GlobalStyles isRTL={isRTL} />
      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
          direction: isRTL ? "rtl" : "ltr",
          position: "relative"
        }}
      >
        {/* ── MOBILE BACKDROP ── */}
        {sidebarOpen && window.innerWidth < 900 && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 998,
              pointerEvents: "auto"
            }}
          />
        )}

        {/* ── SIDEBAR ── */}
        <aside
          style={{
            width: window.innerWidth < 900 ? (sidebarOpen ? 207 : 0) : 207,
            flexShrink: 0,
            background: "#fff",
            borderRight: isRTL ? "none" : `1px solid ${T.border}`,
            borderLeft: isRTL ? `1px solid ${T.border}` : "none",
            display: "flex",
            flexDirection: "column",
            transition: window.innerWidth < 900 ? "width 0.3s ease" : "none",
            position: window.innerWidth < 900 ? "fixed" : "static",
            height: window.innerWidth < 900 ? "100vh" : "auto",
            zIndex: 999,
            left: isRTL ? "auto" : 0,
            right: isRTL ? 0 : "auto"
          }}
        >
          <div style={{ padding: "1.2rem 1.05rem 0.9rem", borderBottom: `1px solid ${T.border}` }}>
            <div
              style={{
                fontFamily: T.serif,
                fontSize: "1.2rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: T.black
              }}
            >
              TIP<span style={{ color: T.gold }}>·</span>TOP
            </div>
            <div
              style={{
                fontSize: "0.5rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: T.muted,
                marginTop: 2,
                fontFamily: af
              }}
            >
              {t("nav.panel")}
            </div>
          </div>

          <nav style={{ flex: 1, padding: "0.5rem 0", overflowY: "auto" }}>
            {[
              [t("nav.main"), mainNav],
              [t("nav.ops"), opsNav]
            ].map(([grp, items]) => (
              <div key={grp}>
                <div
                  style={{
                    fontSize: "0.49rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: T.mutedLight,
                    padding: "0.75rem 1.05rem 0.2rem",
                    fontFamily: af
                  }}
                >
                  {grp}
                </div>
                {items.map((item) => {
                  const active = page === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setPage(item.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.52rem",
                        padding: "0.54rem 1.05rem",
                        cursor: "pointer",
                        borderLeft: isRTL ? "none" : `2px solid ${active ? T.gold : "transparent"}`,
                        borderRight: isRTL ? `2px solid ${active ? T.gold : "transparent"}` : "none",
                        background: active ? T.goldDim : "transparent",
                        transition: "all .18s"
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.82rem",
                          color: active ? T.gold : T.mutedLight,
                          flexShrink: 0
                        }}
                      >
                        {item.icon}
                      </span>
                      <span
                        style={{
                          fontSize: "0.67rem",
                          fontWeight: active ? 600 : 400,
                          color: active ? T.goldBright : T.charcoal,
                          flex: 1,
                          fontFamily: af
                        }}
                      >
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          style={{
                            background: T.red,
                            color: "#fff",
                            fontSize: "0.47rem",
                            fontWeight: 700,
                            padding: "1px 5px",
                            borderRadius: 20
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </nav>

          <div style={{ padding: "0.78rem 1.05rem", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: "0.48rem" }}>
            <div
              style={{
                width: 23,
                height: 23,
                borderRadius: "50%",
                background: T.goldDim,
                border: `1px solid ${T.gold}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.54rem",
                fontWeight: 700,
                color: T.gold,
                flexShrink: 0
              }}
            >
              AD
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.67rem",
                  fontWeight: 500,
                  color: T.charcoal,
                  fontFamily: af
                }}
              >
                {t("nav.admin")}
              </div>
              <div
                style={{
                  fontSize: "0.53rem",
                  color: T.muted,
                  fontFamily: af
                }}
              >
                {t("nav.superAdmin")}
              </div>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          marginLeft: window.innerWidth < 900 && sidebarOpen ? 207 : 0,
          transition: window.innerWidth < 900 ? "margin-left 0.3s ease" : "none"
        }}>
          {/* Topbar */}
          <div
            style={{
              height: 52,
              flexShrink: 0,
              background: "#fff",
              borderBottom: `1px solid ${T.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: window.innerWidth < 600 ? "0 1rem" : "0 1.5rem",
              gap: "0.5rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1 }}>
              {window.innerWidth < 900 && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    padding: "0.2rem",
                    color: T.black,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  ☰
                </button>
              )}
              <div>
                <div
                  style={{
                    fontFamily: sf,
                    fontSize: window.innerWidth < 600 ? "0.8rem" : "0.94rem",
                    color: T.black
                  }}
                >
                  {t("tb.welcome")}
                </div>
                <div
                  style={{
                    fontSize: window.innerWidth < 600 ? "0.5rem" : "0.58rem",
                    color: T.muted,
                    marginTop: 1,
                    fontFamily: af
                  }}
                >
                  {new Date().toLocaleDateString(isRTL ? "ar-EG" : "en-EG", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: T.green,
                    animation: "pulse 2s infinite"
                  }}
                />
                <span
                  style={{
                    fontSize: "0.57rem",
                    color: T.green,
                    fontWeight: 700,
                    fontFamily: af
                  }}
                >
                  {t("tb.live")}
                </span>
              </div>
              <button
                onClick={() => changeLanguage(lang === "en" ? "ar" : "en")}
                style={{
                  padding: "0.32rem 0.82rem",
                  borderRadius: 6,
                  border: `1.5px solid ${T.gold}`,
                  background: T.goldDim,
                  color: T.goldBright,
                  cursor: "pointer",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  fontFamily: af
                }}
              >
                {t("tb.langSwitch")}
              </button>
              {[t("tb.refresh"), t("tb.logout")].map((label, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i === 1 && onLogout) onLogout();
                  }}
                  style={{
                    padding: "0.32rem 0.78rem",
                    borderRadius: 6,
                    border: `1px solid ${T.border}`,
                    background: "transparent",
                    color: T.muted,
                    cursor: "pointer",
                    fontSize: "0.67rem",
                    fontWeight: 500,
                    fontFamily: af,
                    transition: "all .2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = i === 1 ? T.red : T.gold;
                    e.currentTarget.style.color = i === 1 ? T.red : T.gold;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = T.border;
                    e.currentTarget.style.color = T.muted;
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              overflow: "hidden",
              padding: page === "checkout" ? "0" : "1.35rem",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {page !== "checkout" && (
              <div style={{ marginBottom: "1.05rem", flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: "0.55rem",
                    letterSpacing: "0.27em",
                    textTransform: "uppercase",
                    color: T.gold,
                    marginBottom: "0.22rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: af
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 14,
                      height: 1,
                      background: T.gold
                    }}
                  />
                  {NAV.find((n) => n.id === page)?.icon}
                </div>
                <h1
                  style={{
                    fontFamily: isRTL ? AF : T.serif,
                    fontSize: "1.5rem",
                    fontWeight: 400,
                    color: T.black,
                    lineHeight: 1.1
                  }}
                >
                  {NAV.find((n) => n.id === page)?.label}
                </h1>
              </div>
            )}

            <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <ErrorBoundary>
                {page === "dashboard" && <DashboardPage products={products} />}
                {page === "catalog" && (
                  <CatalogPage products={products} setProducts={setProducts} />
                )}
                {page === "add" && <AddProductPage onSaved={handleAddSaved} />}
                {page === "landing" && <LandingPageEditor onSave={() => {}} />}
                {page === "orders" && <OrdersPage />}
                {page === "checkout" && <CheckoutPanel products={products} />}
                {page === "settings" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1
                    }}
                  >
                    <div style={{ textAlign: "center", color: T.muted }}>
                      <div style={{ fontSize: "2.4rem", opacity: 0.18, marginBottom: "0.75rem" }}>
                        🏗️
                      </div>
                      <div
                        style={{
                          fontFamily: isRTL ? AF : T.serif,
                        fontSize: "1.08rem",
                        color: T.black,
                        marginBottom: 4
                      }}
                    >
                      {NAV.find((n) => n.id === page)?.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontFamily: af,
                        maxWidth: 340,
                        lineHeight: 1.75
                      }}
                    >
                      {t("coming")}
                    </div>
                  </div>
                </div>
              )}
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
