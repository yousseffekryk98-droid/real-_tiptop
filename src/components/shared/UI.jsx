import { useRef, useEffect, useCallback, useState } from "react";
import { useTranslation } from "../../contexts/I18nContext";
import { T, AF } from "../../config/tokens";
import { varTotal, getHealth } from "../../utils/helpers";

/* ─── Health Badge ─── */
export function HealthBadge({ variants }) {
  const { t } = useTranslation();
  const h = getHealth(variants, t);
  const tot = varTotal(variants);
  const pct = Math.min(100, (tot / 20) * 100);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          flex: 1,
          height: 3,
          background: T.sg,
          borderRadius: 2,
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: h.color,
            borderRadius: 2,
            transition: "width .6s"
          }}
        />
      </div>
      <span
        style={{
          padding: "1px 8px",
          borderRadius: 20,
          fontSize: "0.57rem",
          fontWeight: 700,
          color: h.color,
          background: h.bg,
          whiteSpace: "nowrap"
        }}
      >
        {h.label}
      </span>
    </div>
  );
}

/* ─── Draggable Price Tag ─── */
export function DraggablePriceTag({ price, onRemove, containerRef }) {
  const { t, isRTL } = useTranslation();
  const tagRef = useRef(null);
  const drag = useRef(false);
  const off = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 20, y: 20 });
  const [vis, setVis] = useState(false);

  useEffect(() => {
    setTimeout(() => setVis(true), 60);
  }, []);

  const onMD = useCallback((e) => {
    drag.current = true;
    const r = tagRef.current.getBoundingClientRect();
    off.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    e.preventDefault();
  }, []);

  useEffect(() => {
    const mv = (e) => {
      if (!drag.current || !containerRef.current) return;
      const cr = containerRef.current.getBoundingClientRect();
      const tr = tagRef.current.getBoundingClientRect();
      setPos({
        x: Math.max(0, Math.min(cr.width - tr.width, e.clientX - cr.left - off.current.x)),
        y: Math.max(0, Math.min(cr.height - tr.height, e.clientY - cr.top - off.current.y))
      });
    };
    const up = () => {
      drag.current = false;
    };
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseup", up);
    };
  }, [containerRef]);

  return (
    <div
      ref={tagRef}
      className={vis ? "tb" : ""}
      onMouseDown={onMD}
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        zIndex: 20,
        background: T.gold,
        color: "#fff",
        padding: "5px 10px",
        borderRadius: 4,
        fontFamily: isRTL ? AF : T.serif,
        fontSize: "1rem",
        fontWeight: 600,
        cursor: "grab",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        gap: 5,
        boxShadow: "0 3px 14px rgba(200,169,110,.45)",
        border: "1px solid rgba(255,255,255,.3)"
      }}
    >
      <span style={{ fontSize: "0.52rem", fontWeight: 700, opacity: 0.85 }}>
        {t("le")}
      </span>
      <span>{price.toLocaleString()}</span>
      <button
        onClick={onRemove}
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: 13,
          height: 13,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,.4)",
          background: "rgba(0,0,0,.2)",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 7,
          padding: 0
        }}
      >
        ✕
      </button>
    </div>
  );
}

/* ─── Section Header ─── */
export function SectionHeader({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
      <div
        style={{
          width: 3,
          height: 14,
          background: T.gold,
          borderRadius: 2,
          flexShrink: 0
        }}
      />
      <span
        style={{
          fontSize: "0.57rem",
          fontWeight: 700,
          letterSpacing: "0.13em",
          textTransform: "uppercase",
          color: T.muted
        }}
      >
        {children}
      </span>
    </div>
  );
}

/* ─── Font Link ─── */
export function FontLink() {
  return (
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&family=Cairo:wght@300;400;500;600;700&display=swap');`}</style>
  );
}
