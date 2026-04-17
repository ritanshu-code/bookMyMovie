import { TheaterModel } from "@/models/theater";

// create theater
export async function createTheater(theaterData) {
    return await TheaterModel.create(theaterData);
}

//get all theaters
export async function getAllTheaters() {
    return await TheaterModel.find();
}

//get theater by id
export async function getTheaterById(theaterId) {
    return await TheaterModel.findById(theaterId);
}

// get theater by state
export async function getTheatersByState(state) {
    return await TheaterModel.find({ state });
}