import { T } from "../../config/tokens";

export function StockPulse({ product }) {
  // Calculate stock status
  const quantity = product.variants?.reduce((sum, v) => sum + v.q, 0) || 0;
  const avgPrice = product.price || 0;
  
  // Prestige Score = Price × Demand (demand estimated by stock level)
  // High prestige = low stock is critical, high prestige = overstocking is inefficient
  const prestigeScore = (avgPrice / 1000) * (100 / Math.max(quantity, 1));

  // Stock status logic
  let status = "normal";
  let statusColor = T.muted;
  let statusLabel = "In Stock";
  let animation = "none";

  if (quantity === 0) {
    status = "outofstock";
    statusColor = T.red;
    statusLabel = "Out of Stock";
    animation = "pulse 2s infinite";
  } else if (quantity < 3 && avgPrice > 500000) {
    // Premium + Low Stock = High Demand Alert
    status = "highdemand";
    statusColor = T.gold;
    statusLabel = "High Demand, Low Stock";
    animation = "pulse 1.5s infinite";
  } else if (quantity > 10) {
    // Overstocked
    status = "overstocked";
    statusColor = T.mutedLight;
    statusLabel = "Overstocked";
    animation = "none";
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
        padding: "0.6rem 0.8rem",
        borderRadius: "6px",
        background: status === "overstocked" ? `${T.muted}15` : status === "outofstock" ? `${T.red}10` : status === "highdemand" ? `${T.gold}15` : "transparent",
        border: `1px solid ${statusColor}`,
        animation: animation
      }}
    >
      {/* Status Indicator Dot */}
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: statusColor,
          flexShrink: 0,
          boxShadow:
            status === "highdemand"
              ? `0 0 12px ${statusColor}80`
              : "none"
        }}
      />

      {/* Text Info */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", flex: 1 }}>
        <div
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            color: statusColor,
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}
        >
          {statusLabel}
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            color: T.charcoal,
            fontFamily: T.mono
          }}
        >
          {quantity} unit{quantity !== 1 ? "s" : ""} | Prestige Score: {prestigeScore.toFixed(1)}
        </div>
      </div>

      {/* Heat Map Badge */}
      <div
        style={{
          padding: "0.3rem 0.6rem",
          borderRadius: "4px",
          fontSize: "0.65rem",
          fontWeight: 700,
          background:
            status === "outofstock" ? `${T.red}25` :
            status === "highdemand" ? `${T.gold}25` :
            status === "overstocked" ? `${T.mutedLight}25` :
            "transparent",
          color: statusColor,
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        }}
      >
        {quantity > 10 ? "✓ Stock" : quantity > 5 ? "✓ Fair" : quantity > 0 ? "⚠ Low" : "✕ Out"}
      </div>
    </div>
  );
}

// Restock Priority Component
export function RestockPriority({ products = [] }) {
  // Calculate prestige scores and sort
  const restockList = products
    .filter(p => p.variants && p.variants.length > 0)
    .map(p => {
      const quantity = p.variants.reduce((sum, v) => sum + v.q, 0);
      const prestigeScore = (p.price / 1000) * (100 / Math.max(quantity, 1));
      return { ...p, quantity, prestigeScore };
    })
    .filter(p => p.quantity < 5 || (p.prestigeScore > 50 && p.quantity < 10))
    .sort((a, b) => b.prestigeScore - a.prestigeScore);

  return (
    <div
      style={{
        padding: "1.2rem",
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: "8px"
      }}
    >
      <div
        style={{
          fontSize: "0.85rem",
          fontWeight: 600,
          fontFamily: T.serif,
          color: T.black,
          marginBottom: "1rem"
        }}
      >
        🚨 Restock Priority Queue
      </div>

      {restockList.length === 0 ? (
        <div style={{ fontSize: "0.8rem", color: T.muted, textAlign: "center", padding: "1rem" }}>
          All products well-stocked
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          {restockList.slice(0, 5).map((product, idx) => (
            <div
              key={product.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "0.8rem",
                background: idx === 0 ? T.goldDim : T.bg,
                borderRadius: "4px",
                borderLeft: `3px solid ${idx === 0 ? T.gold : T.muted}`
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: T.goldDim,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  flexShrink: 0
                }}
              >
                {product.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: T.charcoal }}>
                  {product.name}
                </div>
                <div style={{ fontSize: "0.65rem", color: T.muted, marginTop: "0.2rem" }}>
                  {product.quantity} units | Score: {product.prestigeScore.toFixed(1)}
                </div>
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: T.gold,
                  fontFamily: T.mono
                }}
              >
                #{idx + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
