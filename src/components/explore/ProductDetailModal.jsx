import { useState } from "react";
import { T } from "../../config/tokens";

export function ProductDetailModal({ product, onClose }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Trigger add to cart action
    window.dispatchEvent(
      new CustomEvent("addToCart", {
        detail: { product, variant: selectedVariant, quantity }
      })
    );
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(26, 24, 22, 0.4)",
          zIndex: 998,
          animation: "fadeUp 0.3s ease",
          backdropFilter: "blur(2px)"
        }}
      />

      {/* Modal Sheet */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: T.surface,
          zIndex: 999,
          borderRadius: "16px 16px 0 0",
          maxHeight: "85vh",
          overflowY: "auto",
          animation: "slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "0 -4px 24px rgba(26, 24, 22, 0.15)"
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "sticky",
            top: 0,
            right: 0,
            zIndex: 10,
            background: "none",
            border: "none",
            fontSize: "1.4rem",
            cursor: "pointer",
            padding: "1rem",
            color: T.muted,
            transition: "color 0.2s",
            display: "flex",
            justifyContent: "flex-end",
            width: "100%"
          }}
          onMouseEnter={(e) => (e.target.style.color = T.black)}
          onMouseLeave={(e) => (e.target.style.color = T.muted)}
        >
          ✕
        </button>

        <div style={{ padding: "0 1.2rem 1.5rem", paddingTop: 0 }}>
          {/* Product Image Section */}
          <div
            style={{
              width: "100%",
              height: "280px",
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${T.goldDim}, ${T.blueDim})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "5rem",
              marginBottom: "1.5rem",
              border: `2px solid ${T.border}`,
              overflow: "hidden"
            }}
          >
            {product.emoji || "◈"}
          </div>

          {/* Product Title & Price */}
          <div style={{ marginBottom: "1.2rem" }}>
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: 300,
                fontFamily: T.serif,
                color: T.black,
                margin: "0 0 0.5rem 0",
                letterSpacing: "0.02em"
              }}
            >
              {product.name}
            </h2>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: T.gold,
                margin: 0,
                letterSpacing: "0.05em"
              }}
            >
              EGP {(product.price / 100).toFixed(2)}
            </p>
          </div>

          {/* SKU & Category */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.8rem",
              marginBottom: "1.5rem",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em"
            }}
          >
            <div>
              <p style={{ color: T.muted, margin: "0 0 0.3rem 0" }}>SKU</p>
              <p style={{ color: T.black, margin: 0, fontWeight: 600 }}>
                {product.sku || "N/A"}
              </p>
            </div>
            <div>
              <p style={{ color: T.muted, margin: "0 0 0.3rem 0" }}>Category</p>
              <p style={{ color: T.black, margin: 0, fontWeight: 600 }}>
                {product.cat || "N/A"}
              </p>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p
              style={{
                color: T.charcoal,
                fontSize: "0.85rem",
                lineHeight: 1.6,
                margin: 0,
                fontWeight: 400
              }}
            >
              {product.desc || "High-quality product with premium materials and modern design."}
            </p>
          </div>

          {/* Variants/Sizes */}
          {product.variants && product.variants.length > 0 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <p
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: T.muted,
                  margin: "0 0 0.7rem 0",
                  fontWeight: 600
                }}
              >
                Size Options
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.6rem"
                }}
              >
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    style={{
                      padding: "0.7rem 0.8rem",
                      border: `2px solid ${
                        selectedVariant?.id === variant.id
                          ? T.gold
                          : T.border
                      }`,
                      background:
                        selectedVariant?.id === variant.id
                          ? T.goldDim
                          : T.bg,
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: T.black,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}
                    onMouseEnter={(e) => {
                      if (selectedVariant?.id !== variant.id) {
                        e.target.style.borderColor = T.gold;
                        e.target.style.background = T.goldDim;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedVariant?.id !== variant.id) {
                        e.target.style.borderColor = T.border;
                        e.target.style.background = T.bg;
                      }
                    }}
                  >
                    <div>{variant.l}</div>
                    <div style={{ fontSize: "0.65rem", color: T.muted, marginTop: "0.2rem" }}>
                      {variant.dim}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: T.muted,
                margin: "0 0 0.7rem 0",
                fontWeight: 600
              }}
            >
              Quantity
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                width: "fit-content"
              }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  background: T.border,
                  border: "none",
                  width: "40px",
                  height: "40px",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  color: T.black,
                  fontWeight: 600
                }}
                onMouseEnter={(e) => (e.target.style.background = T.bdark)}
                onMouseLeave={(e) => (e.target.style.background = T.border)}
              >
                −
              </button>
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: T.black,
                  minWidth: "30px",
                  textAlign: "center"
                }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  background: T.border,
                  border: "none",
                  width: "40px",
                  height: "40px",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  color: T.black,
                  fontWeight: 600
                }}
                onMouseEnter={(e) => (e.target.style.background = T.bdark)}
                onMouseLeave={(e) => (e.target.style.background = T.border)}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            style={{
              width: "100%",
              padding: "1rem",
              background: T.black,
              color: T.surface,
              border: "none",
              borderRadius: "4px",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.1s",
              marginBottom: "1rem"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = T.charcoal;
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = T.black;
              e.target.style.transform = "translateY(0)";
            }}
          >
            Add to Cart
          </button>

          {/* Colors palette (if available) */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: T.muted,
                  margin: "0 0 0.7rem 0",
                  fontWeight: 600
                }}
              >
                Available Colors
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  flexWrap: "wrap"
                }}
              >
                {product.colors.map((color, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: color,
                      border: `2px solid ${T.border}`,
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s"
                    }}
                    title={color}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(26, 24, 22, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
}
