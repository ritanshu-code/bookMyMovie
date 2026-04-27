const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = process.env.TMDB_API_KEY
import mongoose from "mongoose";
import { connectDB } from "@/lib/connectDB"
import { SectionModel } from "../models/sectionModel";
import { MovieModel } from "../models/movieModel";

export async function getUpcomingMovies() {
    try {
        const res = await fetch(`${TMDB_BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
        if (!res.ok) {
            throw new Error("Failed to fetch upcoming movies");
        }
        return res.json();
    } catch (error) {
        throw error;
    }
}
export async function getPopularMovies() {
  await connectDB();

  const section = await SectionModel.findOne({ type: "popular" });

  const EXPIRY_TIME = 6 * 60 * 60 * 1000; // 6 hours

  const isExpired =
    !section ||
    Date.now() - new Date(section.lastUpdated).getTime() > EXPIRY_TIME;

  if (!isExpired) {
    return section.movies;
  }

  console.log("Refreshing popular movies...");

  const response = await fetch(
    `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}`
  );

  if (!response.ok) {
    if (section) return section.movies; // fallback to old data
    throw new Error("Failed to fetch popular movies");
  }

  const data = await response.json();

  const simplifiedMovies = data.results.map(movie => ({
    tmdbId: movie.id,
    title: movie.title,
    tagline: movie.tagline,
    overview: movie.overview,
    runtime: movie.runtime,
    genres: movie.genres?.map(g => ({
    id: g.id,
    name: g.name
  })) || [],
    release_date: movie.release_date,
    spoken_languages: movie.spoken_languages?.map(lang => ({ english_name: lang.english_name })),
    poster_path: movie.poster_path,
    vote_count: movie.vote_count,
    vote_average: movie.vote_average
  }));

  await SectionModel.findOneAndUpdate(
    { type: "popular" },
    {
      type: "popular",
      movies: simplifiedMovies,
      lastUpdated: new Date()
    },
    {
      upsert: true,
      returnDocument: "after"
    }
  );

  return simplifiedMovies;
}


export async function getMovieById(tmdbId) {
  await connectDB();

  let movie = await MovieModel.findOne({ tmdbId });

  if (!movie) {
    throw new Error("Movie not found in DB");
  }

  if (!movie.isDetailed) {
    console.log("Fetching full movie details...");

    const res = await fetch(
      `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${API_KEY}`
    );

    if (!res.ok) return movie; // fallback to basic data

    const fullData = await res.json();
    console.log("Full movie data:", fullData);
    movie = await MovieModel.findOneAndUpdate(
      { tmdbId },
      {
        runtime: fullData.runtime,
        genres: fullData.genres?.map(g => ({
          id: g.id,
          name: g.name
        })) || [],
        spoken_languages: fullData.spoken_languages?.map(l => ({
          english_name: l.english_name
        })) || [],
        overview: fullData.overview,
        isDetailed: true
      },
      { returnDocument: "after" }
    );
  }

  return movie;
}

// get all movies
export async function getAllMovies() {
  await connectDB();
  console.log("DB NAME:", mongoose.connection.name);
  return MovieModel.find({});
}
