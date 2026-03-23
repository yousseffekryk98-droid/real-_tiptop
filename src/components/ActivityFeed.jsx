import { useState, useEffect } from "react";
import { useTranslation } from "../contexts/I18nContext";
import { T, AF } from "../config/tokens";

export function ActivityFeed({ products }) {
  const { t, isRTL } = useTranslation();
  const sf = isRTL ? AF : T.serif;

  const [events, setEvents] = useState(() => {
    const now = Date.now();
    return [
      {
        id: 1,
        tkey: "order",
        nameEN: "Executive Lazy Boy",
        sub: "#TT-4821",
        type: "order",
        time: now - 45000
      },
      {
        id: 2,
        tkey: "update",
        nameEN: "Nordic Task Chair",
        sub: "LE 3,100 → LE 2,950",
        type: "update",
        time: now - 180000
      },
      { id: 3, tkey: "alert", nameEN: "", sub: "", type: "alert", time: now - 360000 },
      {
        id: 4,
        tkey: "img",
        nameEN: "Cloud Comfort Sofa",
        sub: "media/products/cloud-sofa.jpg",
        type: "media",
        time: now - 720000
      },
      {
        id: 5,
        tkey: "auth",
        nameEN: "",
        sub: "IP 192.168.1.1 · Cairo",
        type: "auth",
        time: now - 3600000
      }
    ];
  });

  const [dot, setDot] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      const pr = products[Math.floor(Math.random() * products.length)];
      const keys = ["order", "update", "alert", "img", "auth"];
      const tkey = keys[Math.floor(Math.random() * keys.length)];
      setEvents((prev) => [
        {
          id: Date.now(),
          tkey,
          nameEN: pr.name,
          sub: `#TT-${Math.floor(1000 + Math.random() * 9000)}`,
          type: tkey,
          time: Date.now()
        },
        ...prev
      ].slice(0, 12));
      setDot(true);
      setTimeout(() => setDot(false), 3000);
    }, 8000);
    return () => clearInterval(iv);
  }, [products]);

  const ago = (ts) => {
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 60) return `${s}${t("feed.s")}`;
    if (s < 3600) return `${Math.floor(s / 60)}${t("feed.m")}`;
    if (s < 86400) return `${Math.floor(s / 3600)}${t("feed.h")}`;
    return `${Math.floor(s / 86400)}${t("feed.d")}`;
  };

  const getText = (ev) => {
    const n = ev.nameEN;
    switch (ev.tkey) {
      case "order":
        return `${t("feed.order")} <b>${n}</b>`;
      case "update":
        return `${t("feed.update")} <b>${n}</b>`;
      case "alert":
        return t("feed.alert");
      case "img":
        return `${t("feed.img")} <b>${n}</b>`;
      default:
        return t("feed.auth");
    }
  };

  const getSub = (ev) => {
    switch (ev.tkey) {
      case "alert":
        return t("feed.restock");
      default:
        return ev.sub;
    }
  };

  const tc = { order: T.green, update: T.blue, alert: T.red, img: T.gold, auth: T.muted };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.85rem"
        }}
      >
        <div>
          <div style={{ fontFamily: sf, fontSize: "0.94rem", color: T.black }}>
            {t("feed.title")}
          </div>
          <div style={{ fontSize: "0.6rem", color: T.muted, marginTop: 1 }}>
            {t("feed.sub")}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ position: "relative", width: 7, height: 7 }}>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: T.green
              }}
            />
            {dot && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: T.green,
                  animation: "ping .8s ease-out"
                }}
              />
            )}
          </div>
          <span style={{ fontSize: "0.58rem", color: T.green, fontWeight: 700 }}>
            {t("tb.live")}
          </span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {events.map((ev, i) => (
          <div
            key={ev.id}
            className={i === 0 ? "si" : ""}
            style={{
              display: "flex",
              gap: "0.55rem",
              padding: "0.48rem 0",
              borderBottom: `1px solid ${T.border}`,
              opacity: i > 7 ? 0.45 : 1
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                flexShrink: 0,
                background: T.sg,
                border: `1px solid ${T.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.73rem"
              }}
            >
              {
                {
                  order: "📦",
                  update: "✏️",
                  alert: "⚠️",
                  img: "🖼️",
                  auth: "🔑"
                }[ev.tkey] || "📦"
              }
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: T.charcoal,
                  lineHeight: 1.4
                }}
                dangerouslySetInnerHTML={{ __html: getText(ev) }}
              />
              <div style={{ fontSize: "0.58rem", color: T.muted, marginTop: 1 }}>
                {getSub(ev)}
              </div>
            </div>
            <div
              style={{
                fontSize: "0.55rem",
                color: tc[ev.tkey] || T.muted,
                fontWeight: 700,
                flexShrink: 0,
                marginTop: 1
              }}
            >
              {ago(ev.time)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
