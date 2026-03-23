import { useState } from "react";
import { useTranslation } from "../contexts/I18nContext";
import { T, AF } from "../config/tokens";

export function CheckoutPanel({ products }) {
  const { t, isRTL } = useTranslation();
  const sf = isRTL ? AF : T.serif;
  const GOVS = t("co.govList").split(",");

  // Seed cart from first 3 products
  const [cart] = useState(() =>
    products.slice(0, 3).map((p) => ({
      product: p,
      variant: p.variants[0] || null,
      qty: 1
    }))
  );

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apt: "",
    city: "",
    gov: "",
    phone: "",
    emailNews: false,
    textNews: false,
    saveInfo: false,
    shipping: "",
    payment: "cod",
    billing: "same"
  });

  const [step, setStep] = useState("form"); // "form" | "success"

  const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const shippingCost = form.shipping === "express" ? 150 : form.shipping === "standard" ? 95 : null;
  const subtotal = cart.reduce((a, c) => a + c.product.price * c.qty, 0);
  const total = subtotal + (shippingCost || 0);

  const fi = {
    background: "#fff",
    border: `1px solid ${T.border}`,
    color: T.black,
    fontSize: "0.82rem",
    padding: "0.6rem 0.82rem",
    borderRadius: 8,
    outline: "none",
    width: "100%",
    transition: "border-color .2s"
  };

  const onFocus = (e) => {
    e.target.style.borderColor = T.gold;
  };
  const onBlur = (e) => {
    e.target.style.borderColor = T.border;
  };

  const lbl = {
    fontSize: "0.6rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: T.muted,
    fontWeight: 500,
    display: "block",
    marginBottom: 4
  };

  const SecTitle = ({ children }) => (
    <div
      style={{
        fontSize: "0.9rem",
        fontWeight: 600,
        color: T.black,
        marginBottom: "1rem",
        paddingBottom: "0.52rem",
        borderBottom: `1px solid ${T.border}`
      }}
    >
      {children}
    </div>
  );

  const Checkbox = ({ checked, onChange, children }) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        fontSize: "0.78rem",
        color: T.charcoal,
        userSelect: "none"
      }}
    >
      <div
        onClick={onChange}
        style={{
          width: 17,
          height: 17,
          borderRadius: 4,
          border: `1.5px solid ${checked ? T.gold : T.border}`,
          background: checked ? T.gold : "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
          transition: "all .15s"
        }}
      >
        {checked && (
          <span style={{ color: "#fff", fontSize: 10, lineHeight: 1 }}>✓</span>
        )}
      </div>
      {children}
    </label>
  );

  const RadioOption = ({ value, label, sub }) => {
    const on = form.shipping === value;
    return (
      <div
        onClick={() => set("shipping", value)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0.82rem 0.95rem",
          border: `1.5px solid ${on ? T.gold : T.border}`,
          borderRadius: 8,
          marginBottom: 7,
          background: on ? T.goldDim : "#fff",
          cursor: "pointer",
          transition: "all .15s"
        }}
      >
        <div
          style={{
            width: 17,
            height: 17,
            borderRadius: "50%",
            border: `2px solid ${on ? T.gold : T.border}`,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all .15s"
          }}
        >
          {on && (
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: T.gold
              }}
            />
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "0.82rem", color: T.charcoal }}>
            {label}
          </div>
          {sub && (
            <div style={{ fontSize: "0.68rem", color: T.muted, marginTop: 1 }}>
              {sub}
            </div>
          )}
        </div>
        <div
          style={{
            fontFamily: sf,
            fontSize: "0.85rem",
            color: on ? T.gold : T.muted,
            fontWeight: 600
          }}
        >
          {value === "standard" ? `${t("le")} 95.00` : `${t("le")} 150.00`}
        </div>
      </div>
    );
  };

  const PayOption = ({ value, label }) => {
    const on = form.payment === value;
    return (
      <div
        onClick={() => set("payment", value)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0.82rem 0.95rem",
          border: `1.5px solid ${on ? T.gold : T.border}`,
          borderRadius: 8,
          marginBottom: 7,
          background: on ? T.goldDim : "#fff",
          cursor: "pointer",
          transition: "all .15s"
        }}
      >
        <div
          style={{
            width: 17,
            height: 17,
            borderRadius: "50%",
            border: `2px solid ${on ? T.gold : T.border}`,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}
        >
          {on && (
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: T.gold
              }}
            />
          )}
        </div>
        <span style={{ fontSize: "0.82rem", color: T.charcoal }}>
          {label}
        </span>
      </div>
    );
  };

  if (step === "success")
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          background: T.bg
        }}
      >
        <div
          className="fu"
          style={{
            textAlign: "center",
            maxWidth: 420,
            padding: "3rem 2rem"
          }}
        >
          <div
            style={{
              fontSize: "3.8rem",
              marginBottom: "1rem",
              animation: "checkPop .5s ease"
            }}
          >
            🎉
          </div>
          <div
            style={{
              fontFamily: sf,
              fontSize: "1.7rem",
              color: T.black,
              marginBottom: "0.5rem"
            }}
          >
            {t("co.success")}
          </div>
          <div
            style={{
              fontSize: "0.84rem",
              color: T.muted,
              lineHeight: 1.75,
              marginBottom: "2rem"
            }}
          >
            {t("co.successSub")}
          </div>
          <button
            onClick={() => setStep("form")}
            style={{
              padding: "0.78rem 2.2rem",
              background: T.black,
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            {t("co.continueShopping")}
          </button>
        </div>
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        overflow: "hidden",
        background: T.bg,
        flexDirection: window.innerWidth < 900 ? "column" : "row"
      }}
    >
      {/* ── Left: Form ── */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: window.innerWidth < 600 ? "1.5rem" : "2.2rem 3rem 3rem",
        maxWidth: window.innerWidth < 900 ? "100%" : 600
      }}>
        {/* Brand */}
        <div
          style={{
            fontFamily: T.serif,
            fontSize: "1.5rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: T.black,
            marginBottom: "2rem"
          }}
        >
          TIP<span style={{ color: T.gold }}>·</span>TOP
        </div>

        {/* ── CONTACT ── */}
        <div style={{ marginBottom: "2rem" }}>
          <SecTitle>{t("co.contact")}</SecTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label style={lbl}>{t("co.emailLabel")}</label>
              <input
                style={fi}
                type="email"
                placeholder={t("co.emailPH")}
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
            <Checkbox
              checked={form.emailNews}
              onChange={() => set("emailNews", !form.emailNews)}
            >
              {t("co.emailNews")}
            </Checkbox>
          </div>
        </div>

        {/* ── DELIVERY ── */}
        <div style={{ marginBottom: "2rem" }}>
          <SecTitle>{t("co.delivery")}</SecTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {/* Country (fixed) */}
            <div>
              <label style={lbl}>{t("co.country")}</label>
              <div
                style={{
                  ...fi,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: T.charcoal,
                  cursor: "default",
                  background: T.sg
                }}
              >
                🇪🇬 {t("co.egypt")}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
              <div>
                <label style={lbl}>{t("co.firstName")}</label>
                <input
                  style={fi}
                  value={form.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
              <div>
                <label style={lbl}>{t("co.lastName")}</label>
                <input
                  style={fi}
                  value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
            </div>
            <div>
              <label style={lbl}>{t("co.address")}</label>
              <input
                style={fi}
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
            <div>
              <label style={lbl}>{t("co.apt")}</label>
              <input
                style={fi}
                value={form.apt}
                onChange={(e) => set("apt", e.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
              <div>
                <label style={lbl}>{t("co.city")}</label>
                <input
                  style={fi}
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
              <div>
                <label style={lbl}>{t("co.gov")}</label>
                <select
                  style={fi}
                  value={form.gov}
                  onChange={(e) => set("gov", e.target.value)}
                  onFocus={onFocus}
                  onBlur={onBlur}
                >
                  <option value="">—</option>
                  {GOVS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label style={lbl}>{t("co.phone")}</label>
              <input
                style={{ ...fi, direction: "ltr" }}
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <Checkbox
                checked={form.saveInfo}
                onChange={() => set("saveInfo", !form.saveInfo)}
              >
                {t("co.saveInfo")}
              </Checkbox>
              <Checkbox
                checked={form.textNews}
                onChange={() => set("textNews", !form.textNews)}
              >
                {t("co.textNews")}
              </Checkbox>
            </div>
          </div>
        </div>

        {/* ── SHIPPING ── */}
        <div style={{ marginBottom: "2rem" }}>
          <SecTitle>{t("co.shipping")}</SecTitle>
          {!form.shipping && (
            <div
              style={{
                padding: "0.8rem 0.95rem",
                border: `1px solid ${T.border}`,
                borderRadius: 8,
                fontSize: "0.78rem",
                color: T.muted,
                background: T.sg,
                marginBottom: 7
              }}
            >
              {t("co.chooseShip")}
            </div>
          )}
          <RadioOption value="standard" label={t("co.standard")} />
          <RadioOption value="express" label={t("co.express")} />
        </div>

        {/* ── PAYMENT ── */}
        <div style={{ marginBottom: "2rem" }}>
          <SecTitle>{t("co.payment")}</SecTitle>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: "0.72rem",
              color: T.muted,
              marginBottom: 12
            }}
          >
            🔒 {t("co.secureNote")}
          </div>
          <PayOption value="cod" label={t("co.cod")} />
          <PayOption value="card" label={t("co.card")} />
          {form.payment === "card" && (
            <div
              className="fu"
              style={{
                padding: "1rem",
                border: `1px solid ${T.border}`,
                borderRadius: 8,
                background: T.sg,
                marginTop: -5,
                display: "flex",
                flexDirection: "column",
                gap: 9
              }}
            >
              <input
                style={{ ...fi, direction: "ltr" }}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                <input
                  style={{ ...fi, direction: "ltr" }}
                  placeholder="MM / YY"
                />
                <input
                  style={{ ...fi, direction: "ltr" }}
                  placeholder="CVV"
                />
              </div>
            </div>
          )}
        </div>

        {/* ── BILLING ── */}
        <div style={{ marginBottom: "2rem" }}>
          <SecTitle>{t("co.billing")}</SecTitle>
          {[
            ["same", t("co.sameBilling")],
            ["diff", t("co.diffBilling")]
          ].map(([val, lbl2]) => {
            const on = form.billing === val;
            return (
              <div
                key={val}
                onClick={() => set("billing", val)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "0.82rem 0.95rem",
                  border: `1.5px solid ${on ? T.gold : T.border}`,
                  borderRadius: 8,
                  marginBottom: 7,
                  background: on ? T.goldDim : "#fff",
                  cursor: "pointer",
                  transition: "all .15s"
                }}
              >
                <div
                  style={{
                    width: 17,
                    height: 17,
                    borderRadius: "50%",
                    border: `2px solid ${on ? T.gold : T.border}`,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  {on && (
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: T.gold
                      }}
                    />
                  )}
                </div>
                <span style={{ fontSize: "0.82rem", color: T.charcoal }}>
                  {lbl2}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── PLACE ORDER ── */}
        <button
          onClick={() => setStep("success")}
          style={{
            width: "100%",
            padding: "0.9rem",
            background: T.black,
            border: "none",
            borderRadius: 8,
            color: "#fff",
            fontSize: "0.82rem",
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.08em",
            marginBottom: 9
          }}
        >
          {t("co.placeOrder")}
        </button>
        <div style={{ textAlign: "center", fontSize: "0.63rem", color: T.muted }}>
          🔒 {t("co.secureFooter")}
        </div>
      </div>

      {/* ── Right: Order Summary ── */}
      <div
        style={{
          width: window.innerWidth < 900 ? "100%" : 390,
          height: window.innerWidth < 900 ? "auto" : "100%",
          flexShrink: 0,
          background: T.sg,
          borderLeft: window.innerWidth < 900 ? "none" : `1px solid ${T.border}`,
          borderTop: window.innerWidth < 900 ? `1px solid ${T.border}` : "none",
          padding: "2.2rem 1.8rem",
          overflowY: "auto",
          maxHeight: window.innerWidth < 900 ? "50vh" : "100%"
        }}
      >
        <div
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: T.muted,
            fontWeight: 600,
            marginBottom: "1.3rem"
          }}
        >
          {t("co.summary")}
        </div>

        {/* Cart items */}
        {cart.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 11,
              marginBottom: "1.1rem",
              alignItems: "flex-start"
            }}
          >
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 9,
                  background: T.border,
                  border: `1px solid ${T.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.65rem"
                }}
              >
                {item.product.emoji}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: -7,
                  right: -7,
                  width: 19,
                  height: 19,
                  borderRadius: "50%",
                  background: T.black,
                  color: "#fff",
                  fontSize: "0.6rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: T.mono
                }}
              >
                {item.qty}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  color: T.black,
                  lineHeight: 1.3
                }}
              >
                {item.product.name}
              </div>
              {item.variant && (
                <div style={{ fontSize: "0.62rem", color: T.muted, marginTop: 2 }}>
                  {t("co.size")} {item.variant.l}
                </div>
              )}
            </div>
            <div
              style={{
                fontFamily: sf,
                fontSize: "0.88rem",
                color: T.black,
                whiteSpace: "nowrap"
              }}
            >
              {t("le")} {(item.product.price * item.qty).toLocaleString()}
            </div>
          </div>
        ))}

        {/* Totals */}
        <div
          style={{
            borderTop: `1px solid ${T.border}`,
            marginTop: "1.1rem",
            paddingTop: "1.1rem",
            display: "flex",
            flexDirection: "column",
            gap: 9
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.76rem",
              color: T.muted
            }}
          >
            <span>{t("co.subtotal")}</span>
            <span style={{ fontFamily: sf, color: T.black }}>
              {t("le")} {subtotal.toLocaleString()}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.76rem",
              color: T.muted
            }}
          >
            <span>{t("co.shippingCost")}</span>
            <span
              style={{
                fontFamily: sf,
                color: shippingCost === null ? T.muted : T.black
              }}
            >
              {shippingCost === null ? "—" : `${t("le")} ${shippingCost.toLocaleString()}`}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
              color: T.black,
              paddingTop: 9,
              borderTop: `1px solid ${T.border}`,
              fontSize: "0.9rem"
            }}
          >
            <span>{t("co.total")}</span>
            <span style={{ fontFamily: sf, fontSize: "1.1rem" }}>
              {t("le")} {total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
