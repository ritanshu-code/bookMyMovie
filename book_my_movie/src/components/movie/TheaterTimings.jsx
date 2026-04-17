"use client"

import { useEffect, useState } from "react"
import dayjs from "dayjs"
import Link from "next/link"

export default function TheaterTimings({ movieId }) {
  const today = dayjs()
  const formattedDate = today.format("DD-MM-YYYY")
  const formattedDate2 = "27-02-2026"

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

  console.log("shows::", shows)


  const next7Days = Array.from({ length: 7 }, (_, i) => today.add(i, "day"))
  return (
    <>
      <hr className="mt-3 border-1 border-gray-200" />
      <div className="flex items-center gap-2 mb-4 overflow-x-auto py-4 px-2">
        {next7Days.map((date, i) => {
          const isSelected = date.isSame(selectedDate, "day")
          return (
            <button
              key={i}
              onClick={() => setSelectedDate(date)}
              className={`flex cursor-pointer flex-col items-center min-w-[50px] rounded-lg px-3 py-2 ${isSelected ? "bg-black text-white font-semibold" : "text-black hover:bg-gray-100"}`}
            >
              <span className="text-sm font-black">{date.format("DD")}</span>
              <span className="text-xs">{date.format("ddd")}</span>
              <span className="text-[10px]">{date.format("MMM").toUpperCase()}</span>
            </button>
          )
        })}
      </div>
      {/* Theaters */}
      <div>
        {shows.map((show) => {
          if (!show.theatre?._id) return null

          const theaterId = show.theatre._id
          const movieName = encodeURIComponent(show.movie?.title || "movie")
          const location = "Delhi"
          const movieId = show.movie?._id || "movieId"
          console.log("movieId ", movieId);
          
          return (
            <div key={show._id}>
              {/* Theater Info */}
              <div className="flex items-start gap-3 mb-2 px-3">
                <img
                  src={show.theatre.logo || "/default-logo.png"}
                  alt={show.theatre.name || "Theater"}
                  className="w-8 h-8 object-contain"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {show.theatre.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Allows Cancellation
                  </p>
                </div>
              </div>

              {/* Show Timing */}
              <div className="flex flex-wrap gap-3 ml-11 mb-6">
                <Link
                  href={`/booking/${movieId}/${movieName}/${location}/theater/${theaterId}/show/${show._id}/seat-layout`}
                >
                  <button className="border cursor-pointer p-2 hover:bg-gray-100 border-gray-300 rounded-lg">
                    <div className="flex flex-col gap-2">
                      <span className="leading-tight font-semibold">
                        {show.startTime}
                      </span>
                      <span className="text-[10px] text-gray-500 font-black">
                        {show.audioType?.toUpperCase()}
                      </span>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

