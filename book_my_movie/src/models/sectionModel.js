import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        unique: true // "popular", "now_playing"
    },

    movies: [
        {
            tmdbId: {
                type: Number,
                required: true,
                unique: true
            },

            title: { type: String, required: true },
            tagline: { type: String },
            overview: { type: String, required: true },
            runtime: { type: Number, required: true },

            genres: [
                {
                    id: Number,
                    name: String
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
        }
    ],


    lastUpdated: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

export const SectionModel = mongoose.models.Section || mongoose.model("Section", sectionSchema);