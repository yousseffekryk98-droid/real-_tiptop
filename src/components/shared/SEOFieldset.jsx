import { useState, useEffect } from "react";
import { useTranslation } from "../../contexts/I18nContext";
import { T } from "../../config/tokens";
import { mkSlug } from "../../utils/helpers";

export function SEOFieldset({ productName, price }) {
  const { t } = useTranslation();
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [alt, setAlt] = useState("");
  const [og, setOg] = useState("");
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (!manual) setSlug(mkSlug(productName || ""));
    setTitle(productName ? `${productName} — TIPTOP` : "");
    setDesc(
      productName && price
        ? `${productName} by TIPTOP. Premium furniture from LE ${Number(price).toLocaleString()}.`
        : ""
    );
    setAlt(productName ? `${productName} by TIPTOP — product image` : "");
  }, [productName, price, manual]);

  const score = title && desc && slug && alt ? "good" : title && slug ? "needsWork" : "poor";
  const sc = { good: T.green, needsWork: T.gold, poor: T.red }[score];
  const fi = {
    background: "#fff",
    border: `1px solid ${T.border}`,
    color: T.black,
    fontSize: "0.76rem",
    padding: "0.46rem 0.7rem",
    borderRadius: 6,
    outline: "none",
    width: "100%",
    direction: "ltr"
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.82rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.58rem 0.82rem",
          background: T.sg,
          borderRadius: 7,
          border: `1px solid ${T.border}`
        }}
      >
        <div>
          <div style={{ fontSize: "0.68rem", fontWeight: 600, color: T.charcoal }}>
            {t("seo.score")}
          </div>
          <div style={{ fontSize: "0.58rem", color: T.muted }}>{t("seo.scoreSub")}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: sc,
              animation: score === "good" ? "pulse 2s infinite" : "none"
            }}
          />
          <span style={{ fontSize: "0.68rem", fontWeight: 700, color: sc }}>
            {t(`seo.${score}`)}
          </span>
        </div>
      </div>

      <div>
        <label style={lbl}>{t("seo.slug")}</label>
        <div style={{ display: "flex", gap: 5 }}>
          <span
            style={{
              fontSize: "0.61rem",
              color: T.muted,
              background: T.sg,
              border: `1px solid ${T.border}`,
              padding: "0.46rem 0.55rem",
              borderRadius: 6,
              whiteSpace: "nowrap",
              direction: "ltr"
            }}
          >
            {t("seo.slugBase")}
          </span>
          <input
            style={fi}
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setManual(true);
            }}
          />
          <button
            onClick={() => {
              setSlug(mkSlug(productName || ""));
              setManual(false);
            }}
            style={{
              padding: "0.44rem 0.65rem",
              background: "transparent",
              border: `1px solid ${T.border}`,
              borderRadius: 6,
              fontSize: "0.62rem",
              color: T.muted,
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}
          >
            {t("seo.autoBtn")}
          </button>
        </div>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label style={lbl}>{t("seo.metaTitle")}</label>
          <span style={{ fontSize: "0.56rem", color: title.length > 60 ? T.red : T.muted }}>
            {title.length}/60
          </span>
        </div>
        <input
          style={{ ...fi, borderColor: title.length > 60 ? T.red : T.border }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label style={lbl}>{t("seo.metaDesc")}</label>
          <span style={{ fontSize: "0.56rem", color: desc.length > 160 ? T.red : T.muted }}>
            {desc.length}/160
          </span>
        </div>
        <textarea
          style={{
            ...fi,
            resize: "vertical",
            minHeight: 60,
            lineHeight: 1.6,
            borderColor: desc.length > 160 ? T.red : T.border
          }}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <div>
        <label style={lbl}>{t("seo.altText")}</label>
        <input style={fi} value={alt} onChange={(e) => setAlt(e.target.value)} />
        <div style={{ fontSize: "0.57rem", color: T.muted, marginTop: 2 }}>
          {t("seo.altHint")}
        </div>
      </div>

      <div>
        <label style={lbl}>{t("seo.ogImage")}</label>
        <input
          style={fi}
          value={og}
          onChange={(e) => setOg(e.target.value)}
          placeholder="https://tiptop.com/og/product.jpg"
        />
      </div>

      {(title || desc) && (
        <div
          style={{
            border: `1px solid ${T.border}`,
            borderRadius: 8,
            padding: "0.82rem 0.9rem",
            background: T.sg
          }}
        >
          <div
            style={{
              fontSize: "0.56rem",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: T.muted,
              marginBottom: 6,
              fontWeight: 500
            }}
          >
            {t("seo.serp")}
          </div>
          <div style={{ fontSize: "0.65rem", color: "#1a0dab", direction: "ltr" }}>
            tiptop.com/products/{slug}
          </div>
          <div
            style={{
              fontSize: "0.78rem",
              color: "#1a0dab",
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "0.68rem",
              color: "#545454",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {desc}
          </div>
        </div>
      )}
    </div>
  );
}
