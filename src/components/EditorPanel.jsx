import { useState, useRef } from "react";
import { useTranslation } from "../contexts/I18nContext";
import { T, AF } from "../config/tokens";
import { CATEGORIES, CAT_KEYS, ALL_SECTORS, SECTOR_KEYS } from "../config/constants";
import { varTotal, getHealth } from "../utils/helpers";
import { HealthBadge, DraggablePriceTag, SectionHeader, FontLink } from "./shared/UI";
import { VariantEditor } from "./shared/VariantEditor";
import { SEOFieldset } from "./shared/SEOFieldset";

export function EditorPanel({ product, onClose, onSave }) {
  const { t, isRTL } = useTranslation();
  const sf = isRTL ? AF : T.serif;
  const [p, setP] = useState({
    ...product,
    variants: [...product.variants.map((v) => ({ ...v }))]
  });
  const [tab, setTab] = useState("details");
  const [showTag, setShowTag] = useState(false);
  const [saved, setSaved] = useState(false);
  const imgRef = useRef(null);

  const handleImageUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setP((x) => ({ ...x, img: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const doSave = () => {
    onSave(p);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const tabs = [
    { id: "details", label: t("ed.sec.identity") },
    { id: "variants", label: t("ed.sec.variants") },
    { id: "sectors", label: t("ed.sec.sectors") },
    { id: "seo", label: t("ed.sec.seo") }
  ];

  const fi = {
    background: "#fff",
    border: `1px solid ${T.border}`,
    color: T.black,
    fontSize: "0.76rem",
    padding: "0.46rem 0.7rem",
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

  const health = getHealth(p.variants, t);
  const tot = varTotal(p.variants);

  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        boxShadow: "0 4px 28px rgba(0,0,0,.07)"
      }}
    >
      <FontLink />

      {/* ── Header ── */}
      <div style={{ padding: "0.85rem 1rem 0", borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "0.75rem"
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: sf,
                fontSize: "1rem",
                color: T.black,
                lineHeight: 1.2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              {p.name}
            </div>
            <div style={{ fontSize: "0.59rem", color: T.muted, marginTop: 2, fontFamily: T.mono }}>
              {p.sku}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: T.muted,
              cursor: "pointer",
              fontSize: "1rem",
              padding: "0 0 0 8px",
              flexShrink: 0,
              lineHeight: 1
            }}
          >
            ✕
          </button>
        </div>

        {/* Health strip */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: "0.72rem" }}>
          <HealthBadge variants={p.variants} />
          <div style={{ display: "flex", gap: 12, marginLeft: "auto" }}>
            {[
              [tot, t("ed.totalUnits")],
              [p.variants.length, t("ed.variants")],
              [p.variants.filter((v) => v.q === 0).length, t("ed.outLabel")]
            ].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: sf, fontSize: "1.1rem", color: T.black, lineHeight: 1 }}>
                  {v}
                </div>
                <div style={{ fontSize: "0.52rem", color: T.muted, marginTop: 1, whiteSpace: "nowrap" }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* tabs */}
        <div style={{ display: "flex", gap: 0 }}>
          {tabs.map((tb) => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              style={{
                flex: 1,
                padding: "0.46rem 0.1rem",
                border: "none",
                background: "none",
                fontSize: "0.58rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: tab === tb.id ? T.gold : T.muted,
                borderBottom: `2px solid ${tab === tb.id ? T.gold : "transparent"}`,
                marginBottom: -1,
                cursor: "pointer",
                transition: "all .18s"
              }}
            >
              {tb.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
        {/* DETAILS TAB */}
        {tab === "details" && (
          <div className="fu" style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {/* IMAGE SECTION */}
            <div style={{ background: T.sg, borderRadius: 10, padding: "0.85rem", border: `1px solid ${T.border}` }}>
              <SectionHeader>{t("ed.sec.image")}</SectionHeader>
              <div
                ref={imgRef}
                style={{
                  position: "relative",
                  aspectRatio: "16/9",
                  borderRadius: 8,
                  overflow: "hidden",
                  background: `linear-gradient(145deg,${T.sg} 0%,#ede8df 100%)`,
                  border: `1px solid ${T.border}`
                }}
              >
                {p.img ? (
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "4rem"
                    }}
                  >
                    {p.emoji}
                  </div>
                )}
                {showTag && (
                  <DraggablePriceTag
                    price={p.price}
                    containerRef={imgRef}
                    onRemove={() => setShowTag(false)}
                  />
                )}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(to top,rgba(0,0,0,.5),transparent)",
                    padding: "0.55rem",
                    display: "flex",
                    gap: 5,
                    justifyContent: "center"
                  }}
                >
                  {p.img && (
                    <button
                      onClick={() => setP((x) => ({ ...x, img: null }))}
                      style={{
                        padding: "3px 9px",
                        background: "rgba(216, 57, 49, 0.85)",
                        border: "none",
                        borderRadius: 4,
                        color: "#fff",
                        fontSize: "0.57rem",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      Remove
                    </button>
                  )}
                  <button
                    onClick={() => document.getElementById("productImageInput")?.click()}
                    style={{
                      padding: "3px 9px",
                      background: "rgba(200,169,110,.85)",
                      border: "none",
                      borderRadius: 4,
                      color: "#fff",
                      fontSize: "0.57rem",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    {p.img ? "Change" : "Upload"}
                  </button>
                  <button
                    onClick={() => setShowTag(!showTag)}
                    style={{
                      padding: "3px 9px",
                      background: "rgba(255,255,255,.15)",
                      border: "1px solid rgba(255,255,255,.25)",
                      borderRadius: 4,
                      color: "#fff",
                      fontSize: "0.57rem",
                      cursor: "pointer"
                    }}
                  >
                    {showTag ? "Hide Tag" : showTag ? "Hide Tag" : "Price Tag"}
                  </button>
                </div>
              </div>
              <input
                id="productImageInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  handleImageUpload(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
              <p style={{ fontSize: "0.59rem", color: T.muted, marginTop: 5, lineHeight: 1.5 }}>
                {t("ed.tagHint")}
              </p>
            </div>

            {/* IDENTITY SECTION */}
            <div style={{ background: T.sg, borderRadius: 10, padding: "0.85rem", border: `1px solid ${T.border}` }}>
              <SectionHeader>{t("ed.sec.identity")}</SectionHeader>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                <div>
                  <label style={lbl}>{t("ed.name")}</label>
                  <input
                    style={fi}
                    value={p.name}
                    onChange={(e) => setP((x) => ({ ...x, name: e.target.value }))}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div>
                    <label style={lbl}>{t("ed.cat")}</label>
                    <select
                      style={fi}
                      value={p.cat}
                      onChange={(e) => setP((x) => ({ ...x, cat: e.target.value }))}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {t(CAT_KEYS[c])}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={lbl}>{t("ed.sku")}</label>
                    <input
                      style={{ ...fi, color: T.muted, fontSize: "0.72rem", fontFamily: T.mono }}
                      value={p.sku}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <label style={lbl}>{t("ed.desc")}</label>
                  <textarea
                    value={p.desc || ""}
                    onChange={(e) => setP((x) => ({ ...x, desc: e.target.value }))}
                    style={{ ...fi, resize: "vertical", minHeight: 60, lineHeight: 1.6 }}
                  />
                </div>
              </div>
            </div>

            {/* PRICING SECTION */}
            <div style={{ background: T.sg, borderRadius: 10, padding: "0.85rem", border: `1px solid ${T.border}` }}>
              <SectionHeader>{t("ed.sec.pricing")}</SectionHeader>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "0.72rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "0.68rem",
                    color: T.muted,
                    pointerEvents: "none"
                  }}
                >
                  {t("le")}
                </span>
                <input
                  type="number"
                  style={{ ...fi, paddingLeft: "2.2rem" }}
                  value={p.price}
                  onChange={(e) => setP((x) => ({ ...x, price: Number(e.target.value) }))}
                />
              </div>
              <div
                style={{
                  marginTop: "0.72rem",
                  padding: "0.6rem 0.8rem",
                  background: "#fff",
                  borderRadius: 8,
                  border: `1px solid ${T.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <span style={{ fontFamily: sf, fontSize: "1.35rem", color: T.black }}>
                  {t("le")} {p.price.toLocaleString()}
                </span>
                <span style={{ fontSize: "0.62rem", color: T.muted }}>→ storefront price</span>
              </div>
            </div>
          </div>
        )}

        {/* VARIANTS TAB */}
        {tab === "variants" && (
          <div className="fu">
            <VariantEditor
              variants={p.variants}
              onChange={(vs) => setP((x) => ({ ...x, variants: vs }))}
            />
          </div>
        )}

        {/* SECTORS TAB */}
        {tab === "sectors" && (
          <div className="fu" style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <div
              style={{
                padding: "0.7rem 0.85rem",
                background: T.goldDim,
                border: "1px solid rgba(200,169,110,.22)",
                borderRadius: 8
              }}
            >
              <div style={{ fontSize: "0.68rem", fontWeight: 700, color: T.gold, marginBottom: 3 }}>
                {t("ed.oneTap")}
              </div>
              <div style={{ fontSize: "0.7rem", color: T.charcoal, lineHeight: 1.65 }}>
                {t("ed.oneTapDesc")}
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {ALL_SECTORS.map((s) => {
                const on = p.sectors.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() =>
                      setP((x) => ({
                        ...x,
                        sectors: on ? x.sectors.filter((z) => z !== s) : [...x.sectors, s]
                      }))
                    }
                    style={{
                      padding: "0.3rem 0.82rem",
                      borderRadius: 20,
                      border: `1px solid ${on ? T.gold : T.border}`,
                      background: on ? T.goldDim : "transparent",
                      color: on ? T.goldBright : T.muted,
                      fontSize: "0.67rem",
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
            <div
              style={{
                padding: "0.52rem 0.82rem",
                background: T.sg,
                borderRadius: 7,
                border: `1px solid ${T.border}`
              }}
            >
              <div style={{ fontSize: "0.57rem", color: T.muted, marginBottom: 2 }}>
                {t("ed.activeSectors")}
              </div>
              <div style={{ fontSize: "0.72rem", color: T.gold, fontWeight: 500 }}>
                {p.sectors.length
                  ? p.sectors.map((s) => t(SECTOR_KEYS[s])).join(" · ")
                  : t("ed.noSectors")}
              </div>
            </div>
          </div>
        )}

        {/* SEO TAB */}
        {tab === "seo" && (
          <div className="fu">
            <SEOFieldset productName={p.name} price={p.price} />
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div
        style={{
          padding: "0.82rem 1rem",
          borderTop: `1px solid ${T.border}`,
          display: "flex",
          gap: 7,
          flexShrink: 0,
          background: T.sg
        }}
      >
        <button
          onClick={doSave}
          style={{
            flex: 1,
            padding: "0.62rem",
            background: saved ? T.green : T.black,
            border: "none",
            borderRadius: 7,
            color: "#fff",
            fontSize: "0.7rem",
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.07em",
            transition: "background .3s"
          }}
        >
          {saved ? t("ed.saveOk") : t("ed.save")}
        </button>
        <button
          onClick={onClose}
          style={{
            padding: "0.62rem 0.9rem",
            background: "transparent",
            border: `1px solid ${T.border}`,
            borderRadius: 7,
            color: T.muted,
            fontSize: "0.7rem",
            cursor: "pointer"
          }}
        >
          {t("ed.cancel")}
        </button>
        <button
          style={{
            padding: "0.62rem 0.75rem",
            background: T.redDim,
            color: T.red,
            border: `1px solid rgba(201,74,74,.25)`,
            borderRadius: 7,
            fontSize: "0.65rem",
            cursor: "pointer"
          }}
        >
          {t("ed.delete")}
        </button>
      </div>
    </div>
  );
}
