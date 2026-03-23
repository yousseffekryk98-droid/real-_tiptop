import { useTranslation } from "../contexts/I18nContext";
import { T, AF } from "../config/tokens";
import { CATEGORIES, CAT_KEYS } from "../config/constants";
import { varTotal } from "../utils/helpers";
import { HealthBadge } from "../components/shared/UI";
import { ActivityFeed } from "../components/ActivityFeed";

export function DashboardPage({ products }) {
  const { t, isRTL } = useTranslation();
  const sf = isRTL ? AF : T.serif;

  const totalProducts = products.length;
  const outOfStock = products.filter((p) => varTotal(p.variants) === 0).length;

  const stats = [
    { k: "dash.totalProducts", val: totalProducts, trend: "+8%", up: true, c: T.gold, bg: T.goldDim },
    { k: "dash.sales", val: "LE 15k", trend: "+12%", up: true, c: T.green, bg: T.greenDim },
    { k: "dash.orders", val: "42", trend: "+5%", up: true, c: T.blue, bg: T.blueDim },
    { k: "dash.oos", val: outOfStock, trend: "-2", up: false, c: T.red, bg: T.redDim }
  ];

  const orders = [
    { e: "🛋️", n: "Executive Lazy Boy", id: "#TT-0042", amt: "LE 4,500", st: "delivered" },
    { e: "🖥️", n: "Nordic Desk", id: "#TT-0041", amt: "LE 2,200", st: "processing" },
    { e: "🌿", n: "Monstera Deluxe", id: "#TT-0040", amt: "LE 850", st: "delivered" },
    { e: "🛋️", n: "Cloud Sofa L", id: "#TT-0039", amt: "LE 8,999", st: "pending" },
    { e: "🪑", n: "Task Chair Pro", id: "#TT-0038", amt: "LE 3,100", st: "cancelled" }
  ];

  const stStyle = {
    delivered: { c: T.green, bg: T.greenDim },
    processing: { c: T.gold, bg: T.goldDim },
    pending: { c: T.muted, bg: T.sg },
    cancelled: { c: T.red, bg: T.redDim }
  };

  const catCounts = CATEGORIES.reduce(
    (acc, cat) => ({ ...acc, [cat]: products.filter((p) => p.cat === cat).length }),
    {}
  );
  const maxCat = Math.max(...Object.values(catCounts), 1);

  const th = {
    padding: "0 0.78rem 0.52rem",
    textAlign: isRTL ? "right" : "left",
    fontSize: "0.55rem",
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    color: T.muted,
    fontWeight: 500,
    borderBottom: `1px solid ${T.border}`
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", overflowY: "auto", flex: 1 }}>
      {/* Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: window.innerWidth < 900 ? (window.innerWidth < 600 ? "1fr" : "repeat(2,1fr)") : "repeat(4,1fr)",
        gap: "0.9rem",
        flexShrink: 0
      }}>
        {stats.map((s, i) => (
          <div
            key={i}
            className="fu"
            style={{
              animationDelay: `${i * 0.07}s`,
              background: "#fff",
              border: `1px solid ${T.border}`,
              borderRadius: 10,
              padding: "1rem 1.1rem"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "0.65rem"
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 7,
                  background: s.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <div
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: 2,
                    background: s.c,
                    opacity: 0.85
                  }}
                />
              </div>
              <span
                style={{
                  padding: "2px 6px",
                  borderRadius: 20,
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  color: s.up ? T.green : T.red,
                  background: s.up ? T.greenDim : T.redDim
                }}
              >
                {s.trend}
              </span>
            </div>
            <div
              style={{
                fontFamily: sf,
                fontSize: "1.7rem",
                fontWeight: 400,
                color: T.black,
                lineHeight: 1,
                marginBottom: 3
              }}
            >
              {s.val}
            </div>
            <div style={{ fontSize: "0.62rem", color: T.muted }}>{t(s.k)}</div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr 0.9fr", gap: "1rem", flex: 1, minHeight: 0 }}>
        {/* Orders Table */}
        <div
          style={{
            background: "#fff",
            border: `1px solid ${T.border}`,
            borderRadius: 10,
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          }}
        >
          <div style={{ fontFamily: sf, fontSize: "0.94rem", color: T.black, marginBottom: 2 }}>
            {t("dash.recentOrders")}
          </div>
          <div style={{ fontSize: "0.6rem", color: T.muted, marginBottom: "0.78rem" }}>
            {t("dash.latestTx")}
          </div>
          <div style={{ overflowY: "auto", flex: 1 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {[t("dash.colProduct"), t("dash.colId"), t("dash.colAmount"), t("dash.colStatus")].map((h) => (
                    <th key={h} style={th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <td style={{ padding: "0.52rem 0.78rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ fontSize: "0.9rem" }}>{o.e}</span>
                        <span style={{ fontSize: "0.72rem", fontWeight: 500, color: T.black }}>
                          {o.n}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "0.52rem 0.78rem", fontFamily: T.mono, fontSize: "0.62rem", color: T.gold }}>
                      {o.id}
                    </td>
                    <td
                      style={{
                        padding: "0.52rem 0.78rem",
                        fontFamily: sf,
                        fontSize: "0.8rem",
                        color: T.black,
                        whiteSpace: "nowrap"
                      }}
                    >
                      {o.amt}
                    </td>
                    <td style={{ padding: "0.52rem 0.78rem" }}>
                      <span
                        style={{
                          padding: "2px 6px",
                          borderRadius: 20,
                          fontSize: "0.55rem",
                          fontWeight: 700,
                          color: stStyle[o.st].c,
                          background: stStyle[o.st].bg
                        }}
                      >
                        {t(`st.${o.st}`)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Bars */}
        <div
          style={{
            background: "#fff",
            border: `1px solid ${T.border}`,
            borderRadius: 10,
            padding: "1rem"
          }}
        >
          <div style={{ fontFamily: sf, fontSize: "0.94rem", color: T.black, marginBottom: 2 }}>
            {t("dash.catBreakdown")}
          </div>
          <div style={{ fontSize: "0.6rem", color: T.muted, marginBottom: "0.9rem" }}>
            {t("dash.catSub")}
          </div>
          {CATEGORIES.map((cat) => {
            const cnt = catCounts[cat] || 0;
            return (
              <div key={cat} style={{ marginBottom: "0.72rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: "0.68rem", color: T.charcoal }}>
                    {t(CAT_KEYS[cat])}
                  </span>
                  <span style={{ fontSize: "0.62rem", fontFamily: T.mono, color: T.muted }}>
                    {cnt}
                  </span>
                </div>
                <div
                  style={{
                    height: 5,
                    background: T.sg,
                    borderRadius: 3,
                    overflow: "hidden"
                  }}
                >
                  <div
                    style={{
                      width: `${(cnt / maxCat) * 100}%`,
                      height: "100%",
                      background: T.gold,
                      borderRadius: 3,
                      transition: "width .8s ease"
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Activity Feed */}
        <div
          style={{
            background: "#fff",
            border: `1px solid ${T.border}`,
            borderRadius: 10,
            padding: "1rem",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <ActivityFeed products={products} />
        </div>
      </div>
    </div>
  );
}
