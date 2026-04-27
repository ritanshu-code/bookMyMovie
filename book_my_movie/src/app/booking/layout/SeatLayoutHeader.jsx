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
          <div className="flex items-center justify-between py-4 px-6">
            <Link href={"/"}>
              <Image
                src={mainIcon}
                alt="BookMyMovie"
                width={120}
                height={60}
              />
            </Link>
            <div className="text-center">
              <h2 className="text-xl font-bold">{movieName}</h2>
              <p className="text-sm text-gray-500 font-semibold">
                {dayjs(showData?.date, "DD-MM-YYYY").format("D MMMM YYYY")}
                {" "}
                {showData?.startTime}
                {" at "}
                {showData?.theatre?.name}, {showData?.theatre?.location}
              </p>
            </div>

            {auth ? (
              <>
              <div className="flex items-center gap-6">
                <span className='cursor-pointer, text-sm font-medium border rounded-full border-gray-300 p-2'>
                  <FaUser className='text-gray-500' />
                </span>
                </div>
              </>
            ) : (
              <button
                onClick={() => toggleModal()}
                className='bg-[#f84464] cursor-pointer text-white px-4 py-1.5 rounded text-sm'>
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Show Timings */}
      <div className="bg-white pt-4 mt-20">
        <div className="mx-auto px-6 pb-4 flex items-center gap-4 max-w-7xl">
          <div className="text-sm text-gray-700">
            <p className="font-medium text-gray-500 leading-tight text-sm">
              {dayjs(showData?.date, "DD-MM-YYYY").format("D MMM")}

            </p>
          </div>
          <button className={`border cursor-pointer rounded-[14px] px-8 py-3 text-sm border-black font-medium bg-gray-200`}>
            {showData?.startTime}
            <p>{showData?.audioType.toUpperCase()}</p>
          </button>
        </div>
        <SignInModel />
      </div>

    </>
  )
}

