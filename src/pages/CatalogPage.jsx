import { useState } from "react";
import { useTranslation } from "../contexts/I18nContext";
import { T, AF } from "../config/tokens";
import { CATEGORIES, CAT_KEYS } from "../config/constants";
import { HealthBadge } from "../components/shared/UI";
import { EditorPanel } from "../components/EditorPanel";

export function CatalogPage({ products, setProducts }) {
  const { t, isRTL } = useTranslation();
  const sf = isRTL ? AF : T.serif;
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");

  const filtered = products.filter(
    (p) =>
      (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
      (!catFilter || p.cat === catFilter)
  );

  const handleSave = (upd) => {
    setProducts((prev) => prev.map((p) => (p.id === upd.id ? upd : p)));
    setSelected(upd);
  };

  const th = {
    padding: "0.6rem 0.8rem",
    textAlign: isRTL ? "right" : "left",
    fontSize: "0.55rem",
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    color: T.muted,
    fontWeight: 500,
    position: "sticky",
    top: 0,
    background: "#fff",
    whiteSpace: "nowrap"
  };

  return (
    <div style={{
      display: "flex",
      gap: "1rem",
      height: "100%",
      overflow: "hidden",
      flexDirection: window.innerWidth < 900 ? "column" : "row"
    }}>
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "0.72rem",
        overflow: "hidden",
        minWidth: 0
      }}>
        <div style={{ display: "flex", gap: 7, alignItems: "center", flexShrink: 0 }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("cat.search")}
            aria-label="Search products"
            title="Search products"
            style={{
              flex: 1,
              background: "#fff",
              border: `1px solid ${T.border}`,
              color: T.black,
              fontSize: "0.76rem",
              padding: "0.44rem 0.72rem",
              borderRadius: 7,
              outline: "none"
            }}
          />
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            aria-label="Filter by category"
            title="Filter by category"
            style={{
              background: "#fff",
              border: `1px solid ${T.border}`,
              color: T.muted,
              fontSize: "0.7rem",
              padding: "0.42rem 0.65rem",
              borderRadius: 7,
              outline: "none",
              cursor: "pointer",
              minWidth: 130
            }}
          >
            <option value="">{t("cat.allCats")}</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {t(CAT_KEYS[c])}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            border: `1px solid ${T.border}`,
            borderRadius: 10,
            background: "#fff"
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                {[t("cat.colProduct"), t("cat.colCat"), t("cat.colPrice"), t("cat.colVariants"), t("cat.colHealth")].map((h) => (
                  <th key={h} style={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const sel = selected?.id === p.id;
                return (
                  <tr
                    key={p.id}
                    onClick={() => setSelected(p)}
                    style={{
                      borderBottom: `1px solid ${T.border}`,
                      cursor: "pointer",
                      background: sel ? T.goldDim : "transparent",
                      transition: "background .15s"
                    }}
                  >
                    <td style={{ padding: "0.62rem 0.8rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 6,
                            background: T.sg,
                            border: `1px solid ${T.border}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.95rem",
                            flexShrink: 0,
                            overflow: "hidden"
                          }}
                        >
                          {p.img ? (
                            <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          ) : (
                            p.emoji
                          )}
                        </div>
                        <div>
                          <div style={{ fontSize: "0.74rem", fontWeight: 500, color: T.black }}>
                            {p.name}
                          </div>
                          <div style={{ fontSize: "0.58rem", color: T.muted, fontFamily: T.mono }}>
                            {p.sku}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "0.62rem 0.8rem", fontSize: "0.69rem", color: T.muted }}>
                      {t(CAT_KEYS[p.cat])}
                    </td>
                    <td
                      style={{
                        padding: "0.62rem 0.8rem",
                        fontFamily: sf,
                        fontSize: "0.84rem",
                        color: T.black,
                        whiteSpace: "nowrap"
                      }}
                    >
                      {t("le")} {p.price.toLocaleString()}
                    </td>
                    <td
                      style={{
                        padding: "0.62rem 0.8rem",
                        fontSize: "0.62rem",
                        color: T.muted,
                        fontFamily: T.mono,
                        maxWidth: 140,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {p.variants.map((v) => `${v.l}:${v.q}`).join(" · ") || "—"}
                    </td>
                    <td style={{ padding: "0.62rem 0.8rem", minWidth: 160 }}>
                      <HealthBadge variants={p.variants} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selected ? (
        <div style={{
          width: window.innerWidth < 900 ? "100%" : 340,
          height: window.innerWidth < 900 ? "auto" : "100%",
          flexShrink: 0,
          overflow: window.innerWidth < 900 ? "visible" : "hidden",
          display: "flex",
          maxHeight: window.innerWidth < 900 ? "60vh" : "100%"
        }}>
          <EditorPanel
            key={selected.id}
            product={selected}
            onClose={() => setSelected(null)}
            onSave={handleSave}
          />
        </div>
      ) : (
        <div
          style={{
            width: window.innerWidth < 900 ? "100%" : 240,
            flexShrink: 0,
            background: "#fff",
            border: `1px solid ${T.border}`,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 9,
            color: T.muted,
            padding: 24,
            textAlign: "center",
            minHeight: window.innerWidth < 900 ? "auto" : "100%"
          }}
        >
          <div style={{ fontSize: "2rem", opacity: 0.2 }}>✏️</div>
          <div style={{ fontSize: "0.7rem", lineHeight: 1.7 }}>
            {t("cat.hint")}
          </div>
        </div>
      )}
    </div>
  );
}
