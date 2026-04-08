import { T } from "../../config/tokens";

export function ProductCard({ product, onClick }) {
  const primaryVariant = product.variants?.[0];
  const sizeDisplay = primaryVariant?.dim || product.size || "25cm";
  
  // Extract dimensions for display (e.g., "75×85 cm" -> show as is)
  const displaySize = sizeDisplay.split("×")[0]?.trim() + "cm" || sizeDisplay;

  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.6rem",
        cursor: "pointer",
        transition: "transform 0.2s ease, opacity 0.2s ease",
        userSelect: "none"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Circular Image Container */}
      <div
        style={{
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          border: `4px solid ${T.surface}`,
          background: T.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          flexShrink: 0,
          boxShadow: "0 2px 12px rgba(26, 24, 22, 0.08)",
          position: "relative"
        }}
      >
        {/* Placeholder with emoji or gradient */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3rem",
            background: `linear-gradient(135deg, ${T.goldDim}, ${T.blueDim})`,
            fontFamily: T.sans,
            fontWeight: 300
          }}
        >
          {product.emoji || "◈"}
        </div>
      </div>

      {/* Info Labels Container */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          width: "100%",
          justifyContent: "center",
          flexWrap: "wrap"
        }}
      >
        {/* Price Badge */}
        <div
          style={{
            padding: "0.35rem 0.6rem",
            background: T.black,
            color: T.surface,
            borderRadius: "1px",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
            transition: "background 0.2s"
          }}
        >
          EGP {(product.price / 100).toFixed(2)}
        </div>

        {/* Size Badge */}
        <div
          style={{
            padding: "0.35rem 0.6rem",
            background: T.border,
            color: T.charcoal,
            borderRadius: "1px",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            whiteSpace: "nowrap"
          }}
        >
          {displaySize}
        </div>
      </div>

      {/* Product Name (hidden on mobile, shown on hover via tooltip concept) */}
      <div
        style={{
          fontSize: "0.7rem",
          color: T.muted,
          textAlign: "center",
          maxWidth: "140px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginTop: "-0.2rem"
        }}
      >
        {product.name}
      </div>
    </div>
  );
}
