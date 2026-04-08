import { useState, useMemo } from "react";
import { T } from "../../config/tokens";

export function FilterSidebar({
  products,
  filters,
  onFiltersChange,
  isRTL
}) {
  const [showPriceInput, setShowPriceInput] = useState(false);

  // Extract unique categories and colors from products
  const categories = useMemo(() => {
    const cats = new Set();
    products.forEach(p => {
      if (p.cat) cats.add(p.cat);
    });
    return Array.from(cats).sort();
  }, [products]);

  const colors = useMemo(() => {
    const colorSet = new Map();
    products.forEach(p => {
      p.colors?.forEach(c => {
        if (!colorSet.has(c)) {
          colorSet.set(c, true);
        }
      });
    });
    return Array.from(colorSet.keys());
  }, [products]);

  // Calculate price range for slider
  const priceRange = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 10000 };
    const prices = products.map(p => p.price);
    return {
      min: Math.floor(Math.min(...prices) / 1000) * 1000,
      max: Math.ceil(Math.max(...prices) / 1000) * 1000
    };
  }, [products]);

  const handlePriceChange = (field, value) => {
    const newPrice = { ...filters.priceRange, [field]: value };
    if (newPrice.min <= newPrice.max) {
      onFiltersChange({ ...filters, priceRange: newPrice });
    }
  };

  const handleCategoryToggle = (cat) => {
    const newCats = filters.categories.includes(cat)
      ? filters.categories.filter(c => c !== cat)
      : [...filters.categories, cat];
    onFiltersChange({ ...filters, categories: newCats });
  };

  const handleColorToggle = (color) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    onFiltersChange({ ...filters, colors: newColors });
  };

  const handleSearchChange = (value) => {
    onFiltersChange({ ...filters, search: value });
  };

  return (
    <div
      style={{
        width: "250px",
        flexShrink: 0,
        borderRight: isRTL ? "none" : `1px solid ${T.border}`,
        borderLeft: isRTL ? `1px solid ${T.border}` : "none",
        overflow: "auto",
        background: T.surface,
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Search */}
      <div style={{ padding: "1rem", flexShrink: 0, borderBottom: `1px solid ${T.border}` }}>
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          style={{
            width: "100%",
            padding: "0.6rem 0.8rem",
            border: `1px solid ${T.border}`,
            borderRadius: "4px",
            fontSize: "0.75rem",
            fontFamily: T.sans,
            color: T.charcoal,
            background: T.bg,
            transition: "border-color 0.2s",
            direction: isRTL ? "rtl" : "ltr"
          }}
          onFocus={(e) => (e.target.style.borderColor = T.gold)}
          onBlur={(e) => (e.target.style.borderColor = T.border)}
        />
      </div>

      {/* Filters Menu */}
      <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
        {/* Price Range */}
        <div
          style={{
            padding: "1rem",
            borderBottom: `1px solid ${T.border}`,
            flexShrink: 0
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: T.muted,
              fontWeight: 600,
              marginBottom: "0.8rem",
              cursor: "pointer",
              userSelect: "none"
            }}
            onClick={() => setShowPriceInput(!showPriceInput)}
          >
            Price Range {showPriceInput ? "▼" : "▶"}
          </div>

          {/* Visual Slider */}
          <div style={{ marginBottom: "0.8rem" }}>
            <div
              style={{
                display: "flex",
                gap: "0.4rem",
                marginBottom: "0.6rem"
              }}
            >
              <input
                type="range"
                min={priceRange.min}
                max={priceRange.max}
                value={filters.priceRange.min}
                onChange={(e) => handlePriceChange("min", Number(e.target.value))}
                style={{
                  flex: 1,
                  accentColor: T.gold
                }}
              />
              <input
                type="range"
                min={priceRange.min}
                max={priceRange.max}
                value={filters.priceRange.max}
                onChange={(e) => handlePriceChange("max", Number(e.target.value))}
                style={{
                  flex: 1,
                  accentColor: T.gold
                }}
              />
            </div>

            {/* Price Display */}
            <div
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: T.black,
                textAlign: "center",
                padding: "0.6rem",
                background: T.goldDim,
                borderRadius: "4px",
                fontFamily: T.mono
              }}
            >
              {`EGP ${filters.priceRange.min.toLocaleString()} - EGP ${filters.priceRange.max.toLocaleString()}`}
            </div>
          </div>

          {/* Manual Input */}
          {showPriceInput && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.6rem"
              }}
            >
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange.min}
                onChange={(e) => handlePriceChange("min", Number(e.target.value))}
                style={{
                  padding: "0.5rem 0.6rem",
                  border: `1px solid ${T.border}`,
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  color: T.charcoal,
                  background: T.bg
                }}
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange.max}
                onChange={(e) => handlePriceChange("max", Number(e.target.value))}
                style={{
                  padding: "0.5rem 0.6rem",
                  border: `1px solid ${T.border}`,
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  color: T.charcoal,
                  background: T.bg
                }}
              />
            </div>
          )}
        </div>

        {/* Categories */}
        <div
          style={{
            padding: "1rem",
            borderBottom: `1px solid ${T.border}`,
            flexShrink: 0
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: T.muted,
              fontWeight: 600,
              marginBottom: "0.8rem"
            }}
          >
            Categories
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {categories.map((cat) => (
              <label
                key={cat}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  cursor: "pointer",
                  padding: "0.4rem 0",
                  fontSize: "0.8rem",
                  color: T.charcoal,
                  userSelect: "none"
                }}
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => handleCategoryToggle(cat)}
                  style={{
                    cursor: "pointer",
                    accentColor: T.gold,
                    width: "16px",
                    height: "16px"
                  }}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Colors */}
        {colors.length > 0 && (
          <div
            style={{
              padding: "1rem",
              borderBottom: `1px solid ${T.border}`,
              flexShrink: 0
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: T.muted,
                fontWeight: 600,
                marginBottom: "0.8rem"
              }}
            >
              Colors
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "0.8rem"
              }}
            >
              {colors.map((color) => (
                <div
                  key={color}
                  onClick={() => handleColorToggle(color)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: color,
                    border: filters.colors.includes(color)
                      ? `3px solid ${T.gold}`
                      : `2px solid ${T.border}`,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: filters.colors.includes(color)
                      ? `0 0 12px ${color}66`
                      : "none"
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Active Filters Count */}
        {(filters.categories.length > 0 || filters.colors.length > 0 || filters.search) && (
          <div
            style={{
              padding: "1rem",
              marginTop: "auto",
              borderTop: `1px solid ${T.border}`,
              flexShrink: 0
            }}
          >
            <button
              onClick={() =>
                onFiltersChange({
                  search: "",
                  categories: [],
                  colors: [],
                  priceRange: { min: priceRange.min, max: priceRange.max }
                })
              }
              style={{
                width: "100%",
                padding: "0.6rem",
                background: T.redDim,
                border: `1px solid ${T.red}`,
                color: T.red,
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = T.red;
                e.target.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = T.redDim;
                e.target.style.color = T.red;
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
