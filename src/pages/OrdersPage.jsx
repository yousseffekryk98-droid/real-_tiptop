import { useState, useEffect } from "react";
import { useTranslation } from "../contexts/I18nContext";
import { T } from "../config/tokens";
import { generateOrderId, formatOrderTime } from "../utils/orderIdGenerator";

export function OrdersPage() {
  const { t, isRTL } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customerName: "",
    email: "",
    phone: "",
    items: []
  });

  // Load orders from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  const handleCreateOrder = () => {
    if (!newOrder.customerName) {
      alert("Please enter customer name");
      return;
    }

    const orderId = generateOrderId();
    const order = {
      id: orderId,
      timestamp: new Date().toISOString(),
      customerName: newOrder.customerName,
      email: newOrder.email,
      phone: newOrder.phone,
      items: newOrder.items,
      status: "pending",
      total: 0
    };

    const updated = [order, ...orders];
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    
    setNewOrder({ customerName: "", email: "", phone: "", items: [] });
    setShowNewOrder(false);
  };

  const deleteOrder = (orderId) => {
    if (confirm("Delete this order?")) {
      const updated = orders.filter((o) => o.id !== orderId);
      setOrders(updated);
      localStorage.setItem("orders", JSON.stringify(updated));
    }
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
    background: "#fff"
  };

  const td = {
    padding: "0.7rem 0.8rem",
    fontSize: "0.75rem",
    borderBottom: `1px solid ${T.border}`
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "1rem", padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 600 }}>Orders</h2>
        <button
          onClick={() => setShowNewOrder(!showNewOrder)}
          style={{
            padding: "0.6rem 1.2rem",
            background: T.gold,
            color: T.black,
            border: "none",
            borderRadius: 6,
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s"
          }}
          onMouseOver={(e) => e.target.style.background = T.goldLight}
          onMouseOut={(e) => e.target.style.background = T.gold}
        >
          {showNewOrder ? "Cancel" : "+ New Order"}
        </button>
      </div>

      {showNewOrder && (
        <div
          style={{
            background: "#f9f9f9",
            border: `1px solid ${T.border}`,
            borderRadius: 8,
            padding: "1rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem"
          }}
        >
          <div>
            <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, marginBottom: "0.3rem", color: T.muted }}>
              Customer Name *
            </label>
            <input
              type="text"
              placeholder="Enter name"
              value={newOrder.customerName}
              onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
              style={{
                width: "100%",
                padding: "0.6rem",
                border: `1px solid ${T.border}`,
                borderRadius: 6,
                fontSize: "0.9rem"
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, marginBottom: "0.3rem", color: T.muted }}>
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={newOrder.email}
              onChange={(e) => setNewOrder({ ...newOrder, email: e.target.value })}
              style={{
                width: "100%",
                padding: "0.6rem",
                border: `1px solid ${T.border}`,
                borderRadius: 6,
                fontSize: "0.9rem"
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, marginBottom: "0.3rem", color: T.muted }}>
              Phone
            </label>
            <input
              type="tel"
              placeholder="Enter phone"
              value={newOrder.phone}
              onChange={(e) => setNewOrder({ ...newOrder, phone: e.target.value })}
              style={{
                width: "100%",
                padding: "0.6rem",
                border: `1px solid ${T.border}`,
                borderRadius: 6,
                fontSize: "0.9rem"
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end" }}>
            <button
              onClick={handleCreateOrder}
              style={{
                padding: "0.6rem 1.2rem",
                background: T.gold,
                color: T.black,
                border: "none",
                borderRadius: 6,
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                flex: 1
              }}
            >
              Create Order
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          border: `1px solid ${T.border}`,
          borderRadius: 8,
          background: "#fff"
        }}
      >
        {orders.length === 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: T.muted,
              fontSize: "0.9rem"
            }}
          >
            No orders yet. Create your first order!
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                <th style={th}>Order ID</th>
                <th style={th}>Customer</th>
                <th style={th}>Email</th>
                <th style={th}>Phone</th>
                <th style={th}>Created</th>
                <th style={th}>Status</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: `1px solid ${T.border}`, hover: true }}>
                  <td style={{ ...td, fontWeight: 600, color: T.gold, fontFamily: "monospace" }}>
                    {order.id}
                  </td>
                  <td style={td}>{order.customerName}</td>
                  <td style={{ ...td, color: T.muted, fontSize: "0.7rem" }}>{order.email || "—"}</td>
                  <td style={{ ...td, color: T.muted, fontSize: "0.7rem" }}>{order.phone || "—"}</td>
                  <td style={{ ...td, color: T.muted, fontSize: "0.7rem" }}>
                    {new Date(order.timestamp).toLocaleDateString()} {formatOrderTime(order.timestamp)}
                  </td>
                  <td style={td}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.3rem 0.6rem",
                        background: order.status === "pending" ? "#fff3cd" : "#d4edda",
                        color: order.status === "pending" ? "#856404" : "#155724",
                        borderRadius: 4,
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        textTransform: "capitalize"
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td style={td}>
                    <button
                      onClick={() => deleteOrder(order.id)}
                      style={{
                        padding: "0.3rem 0.6rem",
                        background: "#ffebee",
                        color: "#c62828",
                        border: `1px solid #ef5350`,
                        borderRadius: 4,
                        fontSize: "0.7rem",
                        cursor: "pointer",
                        fontWeight: 600
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
