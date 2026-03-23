/* ══════════════════════════════════════════════════════════════════
   UTILITY HELPERS
══════════════════════════════════════════════════════════════════ */

import { T } from "../config/tokens";

export const varTotal = (variants) => variants.reduce((a, v) => a + v.q, 0);

export const getHealth = (variants, t) => {
  const tot = varTotal(variants);
  const hasOut = variants.some(v => v.q === 0);
  if (tot === 0) return { label: t("h.out"), color: T.red, bg: T.redDim };
  if (tot <= 4 || hasOut) return { label: t("h.low"), color: T.gold, bg: T.goldDim };
  return { label: t("h.ok"), color: T.green, bg: T.greenDim };
};

export const mkSlug = (n) =>
  n.toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
