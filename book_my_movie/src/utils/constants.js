import { customAlphabet } from "nanoid";

export const tabs = ["Profile", "Your Orders"]

export const razorpayScript = "https://checkout.razorpay.com/v1/checkout.js"


export const seatTypePrices = {
    "PREMIUM": 500,
    "EXECUTIVE": 290,
    "NORMAL": 180
}

export const getSeatTypes = (seatId) => {
  const row = seatId?.charAt(0);

  if (row === "E") return "PREMIUM";
  if (["B", "C", "D"].includes(row)) return "EXECUTIVE";
  if (row === "A") return "NORMAL";

  return "UNKNOWN";
};

export const groupSeatsByType = (seats) => {
  const grouped = {};

  seats.forEach((seatId) => {
    const type = getSeatTypes(seatId);

    if (!grouped[type]) {
      grouped[type] = [];
    }

    grouped[type].push(seatId);
  });

  return Object.entries(grouped).map(([type, seats]) => ({
    type,
    seats,
  }));
};

export const calculateTotalPrice = (seats) => {
  const base = seats.reduce((acc, seatId) => {
    const type = getSeatTypes(seatId);
    const price = seatTypePrices[type] || 0;

    return acc + price;
  }, 0);

  const tax = +(base * 0.18).toFixed(2);
  const total = +(base + tax).toFixed(2);

  return { base, tax, total };
};

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8);

export const generateBookingRef = () => {
  return `BMM-${nanoid()}`;
}