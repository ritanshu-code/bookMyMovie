export const generateSeatLayout = () => {
  return [
    {
      row: "E",
      type: "PREMIUM",
      price: 510,
      seats: Array.from({ length: 10 }, (_, i) => ({
        number: i + 1,
        status: "AVAILABLE",
      })),
    },
    {
      row: "D",
      type: "EXECUTIVE",
      price: 290,
      seats: Array.from({ length: 20 }, (_, i) => ({
        number: i + 1,
        status: "AVAILABLE",
      })),
    },
    {
      row: "C",
      type: "EXECUTIVE",
      price: 290,
      seats: Array.from({ length: 20 }, (_, i) => ({
        number: i + 1,
        status: "AVAILABLE",
      })),
    },
    {
      row: "B",
      type: "EXECUTIVE",
      price: 290,
      seats: Array.from({ length: 20 }, (_, i) => ({
        number: i + 1,
        status: "AVAILABLE",
      })),
    },
    {
      row: "A",
      type: "NORMAL",
      price: 180,
      seats: Array.from({ length: 20 }, (_, i) => ({
        number: i + 1,
        status: "AVAILABLE",
      })),
    },
  ];
};

// export const getSeatType = (seatId) => {
//   const row = seatId?.charAt(0);
//   if (row === "E") return "PREMIUM";
//   if (["B", "C", "D"].includes(row)) return "EXECUTIVE";
//   if(row === "A") return "NORMAL";
//   return "UNKNOWN";
// }

// export const groupSeatsByType = (seats) => {
//   const grouped = {};

//   seats.forEach((seatId) => {
//     const type = getSeatType(seatId);
//     if (!grouped[type]) grouped[type] = [];
//     grouped[type].push(seatId);
//   });

//   return Object.entries(grouped).map(([type, seats]) => ({ type, seats: seats }));
// };

// export const seatTypePrices = {
//   "PREMIUM": 510,
//   "EXECUTIVE": 290,
//   "NORMAL": 180
// }

// export const calculateTotalPrice = (seats) => {
//   const base = seats.reduce((acc, seatId) =>{
//     const type = getSeatType(seatId);
//     const price = seatTypePrices[type] || 0;
//     return acc + price;
//   }, 0);
//   const tax = +(base * 0.05).toFixed(2); // 5% tax
//   const total = +(base + tax).toFixed(2);
//   return { base, tax, total };
// }