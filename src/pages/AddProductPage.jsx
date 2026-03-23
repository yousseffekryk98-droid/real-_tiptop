import { useState } from "react";
import { useTranslation } from "../contexts/I18nContext";
import { T, AF } from "../config/tokens";
import { CATEGORIES, CAT_KEYS, ALL_SECTORS, SECTOR_KEYS, uid } from "../config/constants";
import { mkSlug, varTotal } from "../utils/helpers";
import { SectionHeader } from "../components/shared/UI";
import { VariantEditor } from "../components/shared/VariantEditor";

export function AddProductPage({ onSaved }) {
  const { t, isRTL } = useTranslation();
  const sf = isRTL ? AF : T.serif;

  const [form, setForm] = useState({ name: "", price: "", cat: "", desc: "", emoji: "🛋️" });
  const [variants, setVariants] = useState([
    { id: uid(), l: "S", dim: "", q: 5 },
    { id: uid(), l: "M", dim: "", q: 8 },
    { id: uid(), l: "L", dim: "", q: 3 }
  ]);
  const [sectors, setSectors] = useState(["New Arrivals"]);
  const [saved, setSaved] = useState(false);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const doSave = () => {
    const newProd = {
      id: Date.now(),
      name: form.name || "New Product",
      emoji: form.emoji,
      cat: form.cat || "Decor",
      price: Number(form.price) || 0,
      variants,
      colors: ["#8B4513"],
      sectors,
      desc: form.desc,
      sku: `TT-NEW-${Date.now().toString().slice(-4)}`,
      slug: mkSlug(form.name || "new-product")
    };
    onSaved(newProd);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const doReset = () => {
    setForm({ name: "", price: "", cat: "", desc: "", emoji: "🛋️" });
    setVariants([
      { id: uid(), l: "S", dim: "", q: 5 },
      { id: uid(), l: "M", dim: "", q: 8 },
      { id: uid(), l: "L", dim: "", q: 3 }
    ]);
    setSectors(["New Arrivals"]);
  };

  const fi = {
    background: "#fff",
    border: `1px solid ${T.border}`,
    color: T.black,
    fontSize: "0.76rem",
    padding: "0.47rem 0.7rem",
    borderRadius: 6,
    outline: "none",
    width: "100%"
  };

  const lbl = {
    fontSize: "0.57rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: T.muted,
    fontWeight: 500,
    display: "block",
    marginBottom: 3
  };

  const Block = ({ children, style = {} }) => (
    <div style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 10, padding: "1rem", ...style }}>
      {children}
    </div>
  );

  // Live card preview
  const LiveCard = () => (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${T.border}`,
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 4px 18px rgba(0,0,0,.05)"
      }}
    >
      <div
        style={{
          background: `linear-gradient(145deg,${T.sg} 0%,#ede8df 100%)`,
          height: 148,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative"
        }}
      >
        <span style={{ fontSize: "3.5rem" }}>{form.emoji || "🛋️"}</span>
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: T.gold,
            color: "#fff",
            padding: "3px 8px",
            borderRadius: 4,
            fontFamily: sf,
            fontSize: "0.82rem",
            fontWeight: 600
          }}
        >
          {t("le")} {form.price ? Number(form.price).toLocaleString() : "—"}
        </div>
        {sectors.includes("New Arrivals") && (
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: T.black,
              color: "#fff",
              padding: "3px 7px",
              borderRadius: 3,
              fontSize: "0.5rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 700
            }}
          >
            {t("card.new")}
          </div>
        )}
      </div>
      <div style={{ padding: "0.82rem 0.95rem 0.95rem" }}>
        <div
          style={{
            fontSize: "0.55rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: T.muted,
            marginBottom: 3
          }}
        >
          {form.cat ? t(CAT_KEYS[form.cat]) : t("card.cat")}
        </div>
        <div
          style={{
            fontFamily: sf,
            fontSize: "1.05rem",
            color: T.black,
            marginBottom: 6
          }}
        >
          {form.name || t("card.name")}
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 7 }}>
          {variants
            .filter((v) => v.q > 0)
            .map((v) => (
              <span
                key={v.id}
                style={{
                  padding: "2px 6px",
                  border: `1px solid ${T.gold}`,
                  borderRadius: 3,
                  fontSize: "0.57rem",
                  color: T.gold,
                  fontWeight: 600
                }}
              >
                {v.l}
              </span>
            ))}
        </div>
        <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 9 }}>
          {sectors.slice(0, 3).map((s) => (
            <span
              key={s}
              style={{
                padding: "2px 5px",
                background: T.sg,
                border: `1px solid ${T.border}`,
                borderRadius: 20,
                fontSize: "0.54rem",
                color: T.muted
              }}
            >
              {t(SECTOR_KEYS[s])}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{
              fontFamily: sf,
              fontSize: "1.22rem",
              color: T.black
            }}
          >
            {t("le")} {form.price ? Number(form.price).toLocaleString() : "—"}
          </div>
          <div
            style={{
              padding: "5px 10px",
              background: T.black,
              color: "#fff",
              borderRadius: 5,
              fontSize: "0.58rem",
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              fontWeight: 600
            }}
          >
            {t("card.cart")}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      display: "flex",
      gap: "1.2rem",
      height: "100%",
      overflow: "hidden",
      flexDirection: window.innerWidth < 900 ? "column" : "row"
    }}>
      <div
        style={{
          flex: window.innerWidth < 900 ? undefined : 1.2,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
          minWidth: 0
        }}
      >
        <Block>
          <SectionHeader>{t("add.details")}</SectionHeader>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            <div>
              <label style={lbl}>{t("nav.catalog")}</label>
              <input
                style={fi}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Executive Lazy Boy — Cognac"
              />
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: window.innerWidth < 600 ? "1fr" : "1fr 1fr",
              gap: 8
            }}>
              <div>
                <label style={lbl}>
                  {t("le")} {t("ed.price")}
                </label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "0.7rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "0.67rem",
                      color: T.muted,
                      pointerEvents: "none"
                    }}
                  >
                    {t("le")}
                  </span>
                  <input
                    type="number"
                    style={{ ...fi, paddingLeft: "2.2rem" }}
                    value={form.price}
                    onChange={(e) => set("price", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label style={lbl}>{t("ed.cat")}</label>
                <select
                  style={fi}
                  value={form.cat}
                  onChange={(e) => set("cat", e.target.value)}
                >
                  <option value="">—</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {t(CAT_KEYS[c])}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label style={lbl}>{t("ed.desc")}</label>
              <textarea
                style={{
                  ...fi,
                  resize: "vertical",
                  minHeight: 66,
                  lineHeight: 1.6
                }}
                value={form.desc}
                onChange={(e) => set("desc", e.target.value)}
                placeholder="Materials, dimensions, care instructions…"
              />
            </div>
            <div>
              <label style={lbl}>{t("add.emoji")}</label>
              <div style={{ display: "flex", gap: 5 }}>
                {["🛋️", "🪑", "🌿", "🪴", "💡", "📚", "🪞", "🖥️"].map((e) => (
                  <button
                    key={e}
                    onClick={() => set("emoji", e)}
                    style={{
                      width: 32,
                      height: 32,
                      border: `1.5px solid ${form.emoji === e ? T.gold : T.border}`,
                      borderRadius: 7,
                      background: form.emoji === e ? T.goldDim : "#fff",
                      cursor: "pointer",
                      fontSize: "0.98rem"
                    }}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Block>

        <Block>
          <SectionHeader>{t("add.sizes")}</SectionHeader>
          <VariantEditor variants={variants} onChange={setVariants} />
        </Block>

        <Block>
          <SectionHeader>{t("add.sectors")}</SectionHeader>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {ALL_SECTORS.map((s) => {
              const on = sectors.includes(s);
              return (
                <button
                  key={s}
                  onClick={() =>
                    setSectors((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
                  }
                  style={{
                    padding: "0.29rem 0.75rem",
                    borderRadius: 20,
                    border: `1px solid ${on ? T.gold : T.border}`,
                    background: on ? T.goldDim : "transparent",
                    color: on ? T.goldBright : T.muted,
                    fontSize: "0.66rem",
                    fontWeight: on ? 600 : 400,
                    cursor: "pointer",
                    transition: "all .2s"
                  }}
                >
                  {t(SECTOR_KEYS[s])}
                </button>
              );
            })}
          </div>
        </Block>

        <div style={{ display: "flex", gap: 7 }}>
          <button
            onClick={doSave}
            style={{
              flex: 1,
              padding: "0.65rem",
              background: saved ? T.green : T.black,
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontSize: "0.7rem",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.07em",
              transition: "background .3s"
            }}
          >
            {saved ? t("add.saved") : t("add.save")}
          </button>
          <button
            onClick={doReset}
            style={{
              padding: "0.65rem 1.1rem",
              background: "transparent",
              border: `1px solid ${T.border}`,
              borderRadius: 8,
              color: T.muted,
              fontSize: "0.7rem",
              cursor: "pointer"
            }}
          >
            {t("add.reset")}
          </button>
        </div>
      </div>

      <div
        style={{
          width: window.innerWidth < 900 ? "100%" : 238,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.7rem"
        }}
      >
        <div
          style={{
            fontSize: "0.55rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: T.muted,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
        >
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: T.green,
              animation: "pulse 2s infinite"
            }}
          />
          {t("add.preview")}
        </div>
        <LiveCard />
        <div
          style={{
            padding: "0.7rem 0.82rem",
            background: "#fff",
            border: `1px solid ${T.border}`,
            borderRadius: 8,
            fontSize: "0.63rem",
            color: T.muted,
            lineHeight: 1.65
          }}
        >
          {t("add.previewHint")}
        </div>
      </div>
    </div>
  );
}
