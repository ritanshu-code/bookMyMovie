"use client"

import Image from "next/image";
import mainIcon from "../../../../public/headerAssets/mainIcon.png"
import Link from "next/link";
import dayjs from "dayjs";
import { useAuth } from "@/context/AuthContext";
import SignInModel from "@/components/auth/SignInModal";
import { FaUser } from "react-icons/fa";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function SeatLayoutHeader({ params, showData }) {
  const movieName = params.movieName
  console.log("moviename", movieName);
  const { auth, toggleModal, user } = useAuth();
  console.log("showdata", showData);


  return (
    <>
      <div className="fixed top-0 left-0 w-full z-10">
        <div className="border-b border-gray-200 shadow-md bg-white">
          {/* top bar */}
          <div className="flex items-center justify-between py-2 sm:py-3 md:py-4 px-2 sm:px-4 md:px-6 gap-2">
            <Link href={"/"}>
              <Image
                src={mainIcon}
                alt="BookMyMovie"
                width={100}
                height={50}
                className='w-20 sm:w-24 md:w-32 h-auto'
              />
            </Link>
            <div className="text-center flex-1 min-w-0">
              <h2 className="text-sm sm:text-base md:text-xl font-bold truncate">{showData?.movie?.title || movieName}</h2>
              <p className="text-xs sm:text-xs md:text-sm text-gray-500 font-semibold line-clamp-1 md:line-clamp-2">
                {dayjs(showData?.date, "DD-MM-YYYY").format("D MMM YYYY")}
                {" "}
                {showData?.startTime}
                {" at "}
                <span className='hidden sm:inline'>{showData?.theatre?.name}, {showData?.theatre?.location}</span>
              </p>
            </div>

            {auth ? (
              <>
              <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
                <span className='cursor-pointer text-xs md:text-sm font-medium border rounded-full border-gray-300 p-1 md:p-2'>
                  <FaUser className='text-gray-500 text-sm md:text-base' />
                </span>
                </div>
              </>
            ) : (
              <button
                onClick={() => toggleModal()}
                className='bg-[#f84464] cursor-pointer text-white px-2 sm:px-3 md:px-4 py-1 md:py-1.5 rounded text-xs sm:text-sm md:text-base flex-shrink-0'>
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Show Timings */}
      <div className="bg-white pt-2 sm:pt-3 md:pt-4 mt-16 sm:mt-20 md:mt-24">
        <div className="mx-auto px-2 sm:px-4 md:px-6 pb-2 md:pb-4 flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 max-w-7xl">
          <div className="text-xs sm:text-sm text-gray-700">
            <p className="font-medium text-gray-500 leading-tight">
              {dayjs(showData?.date, "DD-MM-YYYY").format("D MMM")}
            </p>
          </div>
          <button className={`border cursor-pointer rounded-[14px] px-3 sm:px-6 md:px-8 py-2 md:py-3 text-xs sm:text-sm md:text-base border-black font-medium bg-gray-200 hover:bg-gray-300 transition`}>
            {showData?.startTime}
            <p className='text-[10px] sm:text-xs'>{showData?.audioType.toUpperCase()}</p>
          </button>
        </div>
        <SignInModel />
      </div>

    </>
  )
}

