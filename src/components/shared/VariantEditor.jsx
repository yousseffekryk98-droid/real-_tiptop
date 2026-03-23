import { useTranslation } from "../../contexts/I18nContext";
import { T } from "../../config/tokens";
import { uid } from "../../config/constants";
import { varTotal } from "../../utils/helpers";

export function VariantEditor({ variants, onChange }) {
  const { t } = useTranslation();

  const upd = (id, field, raw) => {
    const val = field === "q" ? Math.max(0, parseInt(raw) || 0) : raw;
    onChange(variants.map((v) => (v.id === id ? { ...v, [field]: val } : v)));
  };

  const adj = (id, d) => {
    const cur = variants.find((v) => v.id === id)?.q || 0;
    upd(id, "q", cur + d);
  };

  const remove = (id) => onChange(variants.filter((v) => v.id !== id));
  const addRow = () =>
    onChange([...variants, { id: uid(), l: "", dim: "", q: 0 }]);

  const total = varTotal(variants);
  const fRow = {
    background: "#fff",
    border: `1px solid ${T.border}`,
    color: T.black,
    fontSize: "0.76rem",
    padding: "0.42rem 0.6rem",
    borderRadius: 6,
    outline: "none",
    width: "100%"
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <p style={{ fontSize: "0.65rem", color: T.muted, lineHeight: 1.5, marginBottom: 2 }}>
        {t("ed.varHint")}
      </p>

      {variants.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr 100px 28px",
            gap: 5,
            paddingBottom: 5,
            borderBottom: `1px solid ${T.border}`
          }}
        >
          {[t("ed.varLabel"), t("ed.varDims"), t("ed.varQty"), ""].map((h, i) => (
            <div
              key={i}
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: T.muted,
                fontWeight: 500
              }}
            >
              {h}
            </div>
          ))}
        </div>
      )}

      {variants.map((v) => (
        <div
          key={v.id}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr 100px 28px",
            gap: 5,
            alignItems: "center"
          }}
        >
          <input
            style={fRow}
            value={v.l}
            onChange={(e) => upd(v.id, "l", e.target.value)}
            placeholder={t("ed.varLabel")}
          />
          <input
            style={fRow}
            value={v.dim}
            onChange={(e) => upd(v.id, "dim", e.target.value)}
            placeholder="e.g. 80×90 cm"
          />
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <button
              onClick={() => adj(v.id, -1)}
              style={{
                width: 24,
                height: 24,
                border: `1px solid ${T.border}`,
                borderRadius: 5,
                background: "#fff",
                cursor: "pointer",
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: T.charcoal
              }}
            >
              −
            </button>
            <input
              type="number"
              min={0}
              value={v.q}
              onChange={(e) => upd(v.id, "q", e.target.value)}
              style={{
                flex: 1,
                textAlign: "center",
                border: `1px solid ${T.border}`,
                borderRadius: 5,
                padding: "0.32rem 0",
                fontSize: "0.82rem",
                fontFamily: T.mono,
                outline: "none",
                color: v.q === 0 ? T.red : T.black,
                fontWeight: v.q === 0 ? 700 : 400
              }}
            />
            <button
              onClick={() => adj(v.id, 1)}
              style={{
                width: 24,
                height: 24,
                border: `1px solid ${T.border}`,
                borderRadius: 5,
                background: "#fff",
                cursor: "pointer",
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: T.charcoal
              }}
            >
              +
            </button>
          </div>
          <button
            onClick={() => remove(v.id)}
            style={{
              width: 24,
              height: 24,
              border: "none",
              borderRadius: 5,
              background: T.redDim,
              color: T.red,
              cursor: "pointer",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>
      ))}

      <button
        onClick={addRow}
        style={{
          padding: "0.42rem",
          background: "transparent",
          border: `1.5px dashed ${T.border}`,
          borderRadius: 7,
          color: T.muted,
          fontSize: "0.7rem",
          cursor: "pointer",
          textAlign: "center",
          transition: "border-color .2s"
        }}
      >
        {t("ed.addRow")}
      </button>

      {variants.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.5rem 0.75rem",
            background: T.sg,
            borderRadius: 7,
            border: `1px solid ${T.border}`,
            marginTop: 2
          }}
        >
          <span style={{ fontSize: "0.68rem", color: T.muted }}>
            {t("ed.varTotalLabel")}
          </span>
          <span
            style={{
              fontFamily: T.mono,
              fontSize: "0.85rem",
              fontWeight: 700,
              color: total === 0 ? T.red : T.green
            }}
          >
            {total}
          </span>
        </div>
      )}
    </div>
  );
}
