"use client"

import { useEffect, useState } from "react"
import dayjs from "dayjs"
import Link from "next/link"

export default function TheaterTimings({ movieId }) {
  const today = dayjs()
  const formattedDate = today.format("DD-MM-YYYY")
  const formattedDate2 = "22-04-2026"

  const [selectedDate, setSelectedDate] = useState(today)

  const [shows, setShows] = useState([])

  useEffect(() => {
    async function fetchShows() {
      const res = await fetch(
        `/api/shows?movieId=${movieId}&date=${formattedDate2}&location=Delhi`
      )
      const data = await res.json()

      setShows(data)
    }

    fetchShows()
  }, [movieId])

  

  const groupedShows = shows.reduce((acc, show) => {
    const theatreId = show.theatre?._id;
    if (!theatreId) return acc;

    if (!acc[theatreId]) {
      acc[theatreId] = {
        theatre: show.theatre,
        shows: [],
      };
    }

    acc[theatreId].shows.push(show);

    return acc;
  }, {});


  const next7Days = Array.from({ length: 7 }, (_, i) => today.add(i, "day"))
  return (
    <>
      <hr className="mt-4 sm:mt-6 border-1 border-gray-200" />
      <div className="flex items-center gap-1 sm:gap-2 mb-4 overflow-x-auto py-3 sm:py-4 px-0">
        {next7Days.map((date, i) => {
          const isSelected = date.isSame(selectedDate, "day")
          return (
            <button
              key={i}
              onClick={() => setSelectedDate(date)}
              className={`flex cursor-pointer flex-col items-center min-w-[45px] sm:min-w-[50px] rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm ${isSelected ? "bg-black text-white font-semibold" : "text-black hover:bg-gray-100"}`}
            >
              <span className="text-xs sm:text-sm font-black">{date.format("DD")}</span>
              <span className="text-[10px] sm:text-xs">{date.format("ddd")}</span>
              <span className="text-[8px] sm:text-[10px]">{date.format("MMM").toUpperCase()}</span>
            </button>
          )
        })}
      </div>
      {/* Theaters */}
      <div className="px-0 sm:px-0">
        {Object.values(groupedShows).map((group) => {
          const { theatre, shows } = group;

          return (
            <div key={theatre._id} className="mb-4 sm:mb-6">

              {/* Theater Info */}
              <div className="flex items-start gap-2 sm:gap-3 mb-2 px-2 sm:px-3">
                <img
                  src={theatre.logo || "/default-logo.png"}
                  alt={theatre.name}
                  className="w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                    {theatre.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Allows Cancellation
                  </p>
                </div>
              </div>

              {/* Show Timings */}
              <div className="flex flex-wrap gap-2 sm:gap-3 ml-8 sm:ml-11">
                {shows.map((show) => {
                  const movieName = encodeURIComponent(show.movie?.title || "movie");
                  const location = "Delhi";
                  const movieId = show.movie?._id;

                  return (
                    <Link
                      key={show._id}
                      href={`/booking/${movieId}/${movieName}/${location}/theater/${theatre._id}/show/${show._id}/seat-layout`}
                    >
                      <button className="border cursor-pointer px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-100 border-gray-300 rounded-lg text-xs sm:text-sm transition">
                        <div className="flex flex-col gap-1">
                          <span className="leading-tight font-semibold text-xs sm:text-sm">
                            {show.startTime}
                          </span>
                          <span className="text-[8px] sm:text-[10px] text-gray-500 font-black">
                            {show.audioType?.toUpperCase()}
                          </span>
                        </div>
                      </button>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

