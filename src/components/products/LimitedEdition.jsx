import { useState, useEffect } from "react";
import { T } from "../../config/tokens";

export function LimitedEditionBadge({ product }) {
  if (!product.isLimited) return null;

  const [timeLeft, setTimeLeft] = useState(() => {
    // Calculate time left until expiration
    if (!product.limitedUntil) return null;
    const end = new Date(product.limitedUntil).getTime();
    const now = new Date().getTime();
    return Math.max(0, Math.floor((end - now) / 1000));
  });

  useEffect(() => {
    if (!product.limitedUntil) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const next = Math.max(0, prev - 1);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [product.limitedUntil]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);

    if (days > 0) return `${days}d left`;
    if (hours > 0) return `${hours}h left`;
    if (mins > 0) return `${mins}m left`;
    return `${seconds}s left`;
  };

  const totalAvailable = product.limitedQty || product.variants?.reduce((sum, v) => sum + v.q, 0) || 0;
  const remaining = product.limitedRemaining || totalAvailable;
  const percentUsed = ((totalAvailable - remaining) / totalAvailable) * 100;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
        padding: "0.8rem",
        background: T.goldDim,
        border: `1px solid ${T.gold}`,
        borderRadius: "6px"
      }}
    >
      {/* Exclusive Tag */}
      <div
        style={{
          fontFamily: T.serif,
          fontStyle: "italic",
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          color: T.gold,
          textTransform: "uppercase"
        }}
      >
        ✨ Limited Edition
      </div>

      {/* Info Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "0.7rem", color: T.charcoal, fontWeight: 600 }}>
          {remaining} of {totalAvailable}
        </div>
        <div style={{ fontSize: "0.7rem", color: T.gold, fontWeight: 700, fontFamily: T.mono }}>
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          height: "4px",
          background: T.border,
          borderRadius: "2px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            height: "100%",
            background: T.gold,
            width: `${percentUsed}%`,
            transition: "width 0.3s ease"
          }}
        />
      </div>

      {/* Warning if low */}
      {remaining <= 2 && (
        <div
          style={{
            fontSize: "0.65rem",
            color: T.red,
            fontWeight: 600,
            textAlign: "center"
          }}
        >
          Only {remaining} item{remaining !== 1 ? "s" : ""} remaining!
        </div>
      )}
    </div>
  );
}

// Product badge for cards/modals
export function ExclusiveBadge() {
  return (
    <div
      style={{
        position: "absolute",
        top: "8px",
        right: "8px",
        padding: "0.35rem 0.7rem",
        background: T.gold,
        color: T.surface,
        fontSize: "0.65rem",
        fontWeight: 700,
        fontFamily: T.serif,
        fontStyle: "italic",
        borderRadius: "12px",
        letterSpacing: "0.06em",
        boxShadow: "0 2px 8px rgba(200,169,110,0.3)"
      }}
    >
      1 of 50
    </div>
  );
}
