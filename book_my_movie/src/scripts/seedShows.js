import mongoose from "mongoose";
import dayjs from "dayjs";
import { MovieModel } from "../models/movieModel.js";
import { TheaterModel } from "../models/theater.js";
import { ShowModel } from "../models/showModel.js";
import { generateSeatLayout } from "../utils/index.js"
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const databaseUrl = process.env.DB_URI;


const generatePriceMap = () =>
  new Map([
    ["PREMIUM", 510],
    ["EXECUTIVE", 290],
    ["NORMAL", 270],
  ]);

const formats = ["2D", "3D", "IMAX", "PVR PXL"];

// 🎞️ Realistic time slots
const fixedTimeSlots = [
  { start: "09:00 AM", end: "11:30 AM" },
  { start: "12:30 PM", end: "03:00 PM" },
  { start: "04:00 PM", end: "06:30 PM" },
  { start: "07:30 PM", end: "10:00 PM" },
  { start: "10:30 PM", end: "01:00 AM" },
];

const toDateWithTime = (baseDate, timeStr) => {
  return dayjs(baseDate)
    .hour(dayjs(timeStr, ["hh:mm A"]).hour())
    .minute(dayjs(timeStr, ["hh:mm A"]).minute())
    .second(0)
    .toDate();
};

export const seedShow = async () => {
  const movieIds = ["69926a631e1b4b16215c3c9d", "69926a631e1b4b16215c3c9e", "69926a631e1b4b16215c3c9f", "69926a631e1b4b16215c3c9d", "69926a631e1b4b16215c3ca0", "69926a631e1b4b16215c3ca1"];
  const movies = await MovieModel.find({ _id: { $in: movieIds } });
  const theatres = await TheaterModel.find({ state: "Delhi" });
  
  

  if (!movies.length || !theatres.length) {
    console.error("Movies or theatres not found. Please check IDs or state name.");
    return;
  }

  const today = dayjs().startOf("day");

  for (const movie of movies) {
    for (const theatre of theatres) {
      for (let d = 0; d < 2; d++) { // ✅ today and tomorrow
        const showDate = today.add(d, "day");
        const formattedDate = showDate.format("DD-MM-YYYY");
        const numShows = Math.floor(Math.random() * 3) + 2; // 2–4 shows
        const selectedSlots = fixedTimeSlots.slice(0, numShows);

        for (const slot of selectedSlots) {
          const startTime = toDateWithTime(showDate.toDate(), slot.start);
          const endTime = toDateWithTime(showDate.toDate(), slot.end);

          

          const newShow = new ShowModel({
            movie: movie._id,
            theatre: theatre._id,
            location: theatre.state,
            format: formats[Math.floor(Math.random() * formats.length)],
            audioType: "Dolby Atmos",
            startTime: slot.start, 
            date: formattedDate, // ✅ "DD-MM-YYYY"
            priceMap: generatePriceMap(),
            seatLayout: generateSeatLayout(),
          });

          await newShow.save();
          console.log(
            `🎬 Show created for ${movie.title} at ${theatre.name} on ${formattedDate} (${slot.start} - ${slot.end})`
          );
        }
      }
    }
  }

  console.log("✅ Show seeding completed for selected movies in West Bengal.");
};

mongoose
  .connect(databaseUrl)
  .then(async () => {
    console.log("DB connected");
    await ShowModel.deleteMany({});
    console.log("🧹 Existing shows deleted.");
    await seedShow();
    mongoose.disconnect();
  })
  .catch((err) => console.log(err));