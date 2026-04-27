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

export async function updateSeatStatus(showId, row, seatNumber, status) {
    return await ShowModel.findOneAndUpdate(
        { _id: new Types.ObjectId(showId), "seatLayout.row": row },
        {
            $set: {
                "seatLayout.$.seats.$[elem].status": status
            }
        },
        {
            arrayFilters: [
                { "elem.number": seatNumber }

            ],
        }
    );
}