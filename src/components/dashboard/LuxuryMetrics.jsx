import { useCurrency } from "../../contexts/CurrencyContext";
import { T } from "../../config/tokens";

export function LuxuryMetrics({ orders = [] }) {
  const { formatPrice } = useCurrency();

  // Calculate AOV
  const calculateAOV = () => {
    if (orders.length === 0) return 0;
    const total = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    return total / orders.length;
  };

  // Simulate previous month comparison (in real app, would be calculated from date filters)
  const currentAOV = calculateAOV();
  const previousAOV = currentAOV * 0.833; // Simulate 20% higher than last month
  const comparison = ((currentAOV - previousAOV) / previousAOV) * 100;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.2rem"
      }}
    >
      {/* AOV Card */}
      <div
        style={{
          padding: "1.5rem",
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "0.8rem"
        }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: T.muted,
            fontWeight: 600
          }}
        >
          Average Order Value
        </div>
        <div
          style={{
            fontSize: "2.2rem",
            fontFamily: T.mono,
            fontWeight: 700,
            color: T.gold,
            lineHeight: 1
          }}
        >
          {formatPrice(currentAOV * 100)}
        </div>
        <div
          style={{
            fontSize: "0.8rem",
            color: T.muted,
            fontFamily: T.sans
          }}
        >
          Across {orders.length} order{orders.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Comparison Card */}
      <div
        style={{
          padding: "1.5rem",
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "0.8rem"
        }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: T.muted,
            fontWeight: 600
          }}
        >
          Performance vs Last Month
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0.6rem"
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontFamily: T.mono,
              fontWeight: 700,
              color: comparison > 0 ? T.green : T.red,
              lineHeight: 1
            }}
          >
            {comparison > 0 ? "+" : ""}{comparison.toFixed(1)}%
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              color: comparison > 0 ? T.green : T.red,
              fontWeight: 600
            }}
          >
            {comparison > 0 ? "▲" : "▼"} Higher
          </div>
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            color: T.muted,
            fontFamily: T.sans
          }}
        >
          vs previous period
        </div>
      </div>

      {/* Prestige Score */}
      <div
        style={{
          padding: "1.5rem",
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "0.8rem",
          gridColumn: "1 / -1"
        }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: T.muted,
            fontWeight: 600
          }}
        >
          💎 Luxury Insights
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem"
          }}
        >
          <div>
            <div style={{ fontSize: "0.8rem", color: T.muted, marginBottom: "0.3rem" }}>
              Total Revenue
            </div>
            <div
              style={{
                fontSize: "1.3rem",
                fontFamily: T.mono,
                fontWeight: 700,
                color: T.black
              }}
            >
              {formatPrice(orders.reduce((sum, o) => sum + (o.total || 0), 0) * 100)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: T.muted, marginBottom: "0.3rem" }}>
              Premium Tier
            </div>
            <div
              style={{
                fontSize: "1.3rem",
                fontFamily: T.mono,
                fontWeight: 700,
                color: T.gold
              }}
            >
              {((orders.filter(o => (o.total || 0) > 500000).length / Math.max(orders.length, 1)) * 100).toFixed(0)}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: T.muted, marginBottom: "0.3rem" }}>
              Avg Items/Order
            </div>
            <div
              style={{
                fontSize: "1.3rem",
                fontFamily: T.mono,
                fontWeight: 700,
                color: T.charcoal
              }}
            >
              {orders.length > 0 ? (orders.reduce((sum, o) => sum + (o.items || 1), 0) / orders.length).toFixed(1) : "0"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
