import { useState, useMemo } from "react";
import { useTranslation } from "../contexts/I18nContext";
import { T, AF } from "../config/tokens";
import { ProductCard } from "../components/explore/ProductCard";
import { ProductDetailModal } from "../components/explore/ProductDetailModal";
import { FilterSidebar } from "../components/explore/FilterSidebar";

export function ExplorePage({ products, initialCategory = null }) {
  const { t, isRTL } = useTranslation();
  const af = isRTL ? AF : T.sans;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    categories: initialCategory ? [initialCategory] : [],
    colors: [],
    priceRange: { min: 0, max: 100000 }
  });

  // Apply filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.cat)) {
        return false;
      }

      // Color filter
      if (filters.colors.length > 0) {
        const hasColor = filters.colors.some(color =>
          product.colors?.includes(color)
        );
        if (!hasColor) return false;
      }

      // Price filter
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  // Count active filters
  const activeFilterCount =
    (filters.search ? 1 : 0) +
    filters.categories.length +
    filters.colors.length +
    (filters.priceRange.min > 0 || filters.priceRange.max < 100000 ? 1 : 0);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        overflow: "hidden",
        background: T.bg,
        height: "100%",
        direction: isRTL ? "rtl" : "ltr"
      }}
    >
      {/* Filter Sidebar */}
      <FilterSidebar
        products={products}
        filters={filters}
        onFiltersChange={setFilters}
        isRTL={isRTL}
      />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.2rem 1.2rem",
            borderBottom: `1px solid ${T.border}`,
            flexShrink: 0,
            background: T.surface
          }}
        >
          <div style={{ marginBottom: "0.8rem" }}>
            <h1
              style={{
                fontSize: "1.4rem",
                fontWeight: 300,
                letterSpacing: "0.05em",
                color: T.black,
                fontFamily: T.serif,
                margin: 0
              }}
            >
              {t("nav.catalog") || "Explore"}
            </h1>
            <p
              style={{
                fontSize: "0.7rem",
                color: T.muted,
                marginTop: "0.3rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase"
              }}
            >
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
            </p>
          </div>

          {/* Active Filter Tags */}
          {activeFilterCount > 0 && (
            <div
              style={{
                display: "flex",
                gap: "0.6rem",
                flexWrap: "wrap",
                maxHeight: "60px",
                overflow: "hidden"
              }}
            >
              {filters.search && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.35rem 0.6rem",
                    background: T.goldDim,
                    border: `1px solid ${T.gold}`,
                    borderRadius: "12px",
                    fontSize: "0.7rem",
                    color: T.gold,
                    fontWeight: 600
                  }}
                >
                  🔍 {filters.search}
                  <span
                    onClick={() => setFilters({ ...filters, search: "" })}
                    style={{ cursor: "pointer", marginLeft: "0.2rem" }}
                  >
                    ✕
                  </span>
                </div>
              )}

              {filters.categories.map((cat) => (
                <div
                  key={cat}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.35rem 0.6rem",
                    background: T.blueDim,
                    border: `1px solid ${T.blue}`,
                    borderRadius: "12px",
                    fontSize: "0.7rem",
                    color: T.blue,
                    fontWeight: 600
                  }}
                >
                  {cat}
                  <span
                    onClick={() =>
                      setFilters({
                        ...filters,
                        categories: filters.categories.filter((c) => c !== cat)
                      })
                    }
                    style={{ cursor: "pointer", marginLeft: "0.2rem" }}
                  >
                    ✕
                  </span>
                </div>
              ))}

              {filters.colors.length > 0 && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.35rem 0.6rem",
                    background: T.greenDim,
                    border: `1px solid ${T.green}`,
                    borderRadius: "12px",
                    fontSize: "0.7rem",
                    color: T.green,
                    fontWeight: 600
                  }}
                >
                  🎨 {filters.colors.length} color{filters.colors.length > 1 ? "s" : ""}
                  <span
                    onClick={() => setFilters({ ...filters, colors: [] })}
                    style={{ cursor: "pointer", marginLeft: "0.2rem" }}
                  >
                    ✕
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div
            style={{
              flex: 1,
              overflow: "auto",
              padding: "1.2rem 0.8rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: "1.2rem",
              alignContent: "start"
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleCardClick(product)}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: T.muted,
              gap: "0.8rem"
            }}
          >
            <div style={{ fontSize: "3rem", opacity: 0.2 }}>🔍</div>
            <div style={{ fontSize: "0.9rem", textAlign: "center" }}>
              No products found matching your filters
            </div>
            <button
              onClick={() =>
                setFilters({
                  search: "",
                  categories: [],
                  colors: [],
                  priceRange: { min: 0, max: 100000 }
                })
              }
              style={{
                marginTop: "0.4rem",
                padding: "0.5rem 1rem",
                background: T.goldDim,
                border: `1px solid ${T.gold}`,
                color: T.gold,
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: 600,
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = T.gold;
                e.target.style.color = T.surface;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = T.goldDim;
                e.target.style.color = T.gold;
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {showModal && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
