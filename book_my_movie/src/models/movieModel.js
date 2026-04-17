import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    tmdbId: {
        type: Number,
        required: true,
        unique: true
    },

    title: { type: String, required: true },
    tagline: { type: String },
    overview: { type: String, required: true },
    runtime: { type: Number, required: true },

    genre: [
        {
            name: { type: String, required: true }
        }
    ],

    release_date: { type: String, required: true },

    spoken_languages: [
        {
            english_name: { type: String, required: true }
        }
    ],

    poster_path: { type: String, required: true },
    vote_count: { type: Number, default: 0 },
    vote_average: { type: Number, required: true },

    format: {
        type: String,
        enum: ['2D', '3D', 'IMAX'],
        required: true,
        default: '2D'
    },
    isDetailed: {
        type: Boolean,
        default: false
    },

    lastUpdated: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

export const MovieModel = mongoose.models.Movie || mongoose.model("Movie", movieSchema);