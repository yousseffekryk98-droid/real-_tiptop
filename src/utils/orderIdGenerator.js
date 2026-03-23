// Order ID Generator: Format A1001
// A = Month (A-L for Jan-Dec)
// 1 = Day (1-31)
// 001 = Order sequence number (001-999)

const MONTH_CODES = {
  0: "A", // January
  1: "B", // February
  2: "C", // March
  3: "D", // April
  4: "E", // May
  5: "F", // June
  6: "G", // July
  7: "H", // August
  8: "I", // September
  9: "J", // October
  10: "K", // November
  11: "L" // December
};

export function generateOrderId() {
  const now = new Date();
  const month = MONTH_CODES[now.getMonth()];
  const day = now.getDate();
  
  // Get or initialize order counter from localStorage
  const todayKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  let orderCount = parseInt(localStorage.getItem(`orderCount_${todayKey}`) || "0", 10);
  orderCount += 1;
  
  // Keep count under 999
  if (orderCount > 999) orderCount = 1;
  
  localStorage.setItem(`orderCount_${todayKey}`, orderCount.toString());
  
  const sequence = String(orderCount).padStart(3, "0");
  return `${month}${day}${sequence}`;
}

export function parseOrderId(orderId) {
  // Parse A1001 format
  if (!orderId || orderId.length < 5) return null;
  
  const monthCode = orderId[0];
  const dayStr = orderId[1] === "0" ? orderId[2] : orderId.slice(1, 3);
  const sequence = orderId.slice(-3);
  
  const monthIndex = Object.values(MONTH_CODES).indexOf(monthCode);
  
  return {
    monthCode,
    month: monthIndex !== -1 ? monthIndex + 1 : null,
    day: parseInt(dayStr, 10),
    sequence: parseInt(sequence, 10)
  };
}

export function formatOrderTime(timestamp) {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
