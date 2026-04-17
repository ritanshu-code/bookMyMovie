import mongoose from "mongoose";
const mongo_url = process.env.DB_URI;

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }

    try {
        const conn = await mongoose.connect(mongo_url);
        isConnected = conn.connection.readyState === 1;
        console.log("Connected to MongoDB");
    } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            process.exit(1);
    }
}

export const db = mongoose.connection.db;