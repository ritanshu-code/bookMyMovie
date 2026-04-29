import { ShowModel } from "@/models/showModel";
import { MovieModel } from "@/models/movieModel";
import { TheaterModel } from "@/models/theater";
import { generateSeatLayout } from "@/utils";
import { Types } from "mongoose";
import mongoose from "mongoose";
import { connectDB } from "@/lib/connectDB";

// create show

export async function createShow(showData) {
    const seatLayout = generateSeatLayout()
    const showToCreate = { ...showData, seatLayout };
    return await ShowModel.create(showToCreate);
}

// get show by movieId date and location 

export async function getShowsByMovieDateLocation(movieId, date, location) {
    const query = {
        movie: movieId,
        location: location,
        ...(date && { date })
    };

    console.log("Query:", query);

    const shows = await ShowModel.find(query)
        .populate("movie theatre")
        .sort({ startTime: 1 });

    return shows;
}

// get show by id
export async function getShowById(showId) {
    await connectDB();
    return await ShowModel.findById(showId).populate("movie theatre").lean();
}

// update seat status

export async function updateSeatStatus(showId, seats, status, session) {
    const show = await ShowModel.findById(showId).session(session);

    if (!show) {
        throw new Error("Show not found");
    }
    // parse each seat string like "A1" into row and number
    const pardesSeats = seats.map(seat => {
        const row = seat.charAt(0);
        const number = parseInt(seat.slice(1));
        return { row, number };
    });

    // update seat layout based on parsed seats
    for(const parsedSeat of pardesSeats) {

        // Search the seat layout arr for a row whose "row" field matches. e.g "A1"
        // seatLayout = [{row: "A", seats: [...], {row: "B", seats: [...]}]}]
        const row = show.seatLayout.find(r => r.row === parsedSeat.row);

        if(!row) {
            throw new Error(`Invalid seat row: ${parsedSeat.row}`);
        }

        // Inside the found row , search the seats arr for matching seat number
        // row.seats = [{number: 1, status: "available"}, {number: 2, status: "available"}]
        const seat = row.seats.find(s => s.number === parsedSeat.number);

        if(!seat) {
            throw new Error(`Invalid seat number: ${parsedSeat.number} in row ${parsedSeat.row}`);
        }

        // Guard: prevent double booking - if already booked , reject the whole transaction
        if(seat.status === "BOOKED" ){
            throw new Error(`Seat ${parsedSeat.row}${parsedSeat.number} is already booked`);
        }

        // update seat status
        seat.status = status;

    }

    show.markModified("seatLayout"); // inform mongoose that seatlayout field is modified
    
    await show.save({ session }); // save the show document with updated seat layout within the transaction session
}