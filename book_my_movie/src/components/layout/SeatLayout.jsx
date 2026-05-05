"use client"
import React, { useEffect, useState } from 'react'
import screen from "../../../public/banners/screen.png"
import Image from 'next/image'
import { useSeatContext } from '@/context/SeatContext'
import { socket } from '../../utils/socket';

const Seat = ({ seat, row, onClick, selectedSeats, lockedSeats }) => {
    const seatId = `${row}${seat.number}`
    // if the seatId is present in lockedSeats then it'll be true
    const isLocked = lockedSeats?.includes(seatId);
    const isSelected = selectedSeats.includes(seatId);
    return (
        <button
            className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 m-1 sm:m-1.5 md:m-[2px] rounded-lg border text-xs sm:text-sm
        ${seat.status === "occupied"
                    ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                    : isLocked
                        ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
                        : isSelected
                            ? "bg-[#6e52fa] text-white border-[#cec4f7] border-2 sm:border-3 cursor-pointer"
                            : "hover:bg-gray-100 border-black cursor-pointer"
                }`}
            disabled={seat.status === "occupied" || isLocked}
            onClick={onClick}
        >
            {seat.status === "occupied" || isLocked ? "X" : seat.number}
        </button>
    )
}


export default function SeatLayout({ showData, showId }) {
    const [lockedSeats, setLockedSeats] = useState([]);
    
    const { selectedSeats, setSelectedSeats, setIsSelectedSeats, isSelectedSeats } = useSeatContext();
    const handleSelectSeat = (row, number) => {
        const seatId = `${row}${number}`;

        setSelectedSeats((prev) =>
            prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
        )
    }

    // soket code starts

    useEffect(()=>{
        setSelectedSeats([]);

        socket.emit("join-show", {showId})

        socket.on("locked-seats-initials", ({seatIds})=>{
            setLockedSeats(seatIds);
        })
        socket.on("seat-locked", ({seatIds, showId: incommingShowId})=>{
            if(incommingShowId !== showId) return;
            setLockedSeats((prev) => [...new Set([...prev, ...seatIds])]);
        })
        socket.on("seat-unlocked", ({seatIds, showId: incommingShowId})=>{
            if(incommingShowId !== showId) return;
            setLockedSeats((prev) => prev.filter((id) => !seatIds.includes(id)));
        })
        socket.on("seats-booked", ({seatIds, showId: incommingShowId})=>{
            if(incommingShowId !== showId) return;
            // Permanently lock the booked seats
            setLockedSeats((prev) => [...new Set([...prev, ...seatIds])]);
            console.log("Seats permanently booked:", seatIds);
        })
        socket.on("seat-locked-failed",({showId,
            requested: seatIds,
            alreadyLocked }) =>{
                console.log(`some seats are already locked : ${alreadyLocked.join(", ")}`);
                
            } )
    }, [showId])

    // Update isSelectedSeats whenever selectedSeats changes
    useEffect(()=>{
        setIsSelectedSeats(selectedSeats.length > 0);
    }, [selectedSeats, setIsSelectedSeats])
    
    console.log("locked seats:",lockedSeats);
    

    // socket code ends here

    return (
        <div className="max-w-7xl mx-auto mt-2 sm:mt-3 md:mt-[10px] px-2 sm:px-4 md:px-6 pb-28 sm:pb-32 bg-white min-h-screen">

            <div className="flex flex-col items-center justify-center">

                {showData?.seatLayout && (

                    <div className="flex flex-col items-center w-full">

                        {Object.entries(
                            showData.seatLayout.reduce((acc, curr) => {

                                if (!acc[curr.type]) {
                                    acc[curr.type] = { price: curr.price, rows: [] }
                                }

                                acc[curr.type].rows.push(curr)

                                return acc

                            }, {})
                        ).map(([type, { price, rows }]) => (

                            <div key={type} className="mb-6 sm:mb-8 md:mb-12 w-full flex flex-col items-center justify-center">

                                <h2 className="text-center font-semibold text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
                                    {type} : ₹{price}
                                </h2>

                                <div>

                                    {rows.map((rowObj) => (

                                        <div key={rowObj.row} className="flex items-center">

                                            <div className="w-4 sm:w-5 md:w-6 text-right mr-1 sm:mr-2 text-xs sm:text-sm text-gray-600 flex-shrink-0">
                                                {rowObj.row}
                                            </div>

                                            <div className="flex flex-wrap gap-0.5 sm:gap-1">

                                                {rowObj.seats.map((seat, i) => (
                                                    <Seat
                                                        onClick={() => handleSelectSeat(rowObj.row, seat.number)}
                                                        selectedSeats={selectedSeats}
                                                        lockedSeats={lockedSeats}
                                                        key={i}
                                                        seat={seat}
                                                        row={rowObj.row}
                                                    />
                                                ))}

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>
            <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 px-2">
                <Image
                    src={screen}
                    alt="Screen"
                    width={700}
                    height={100}
                    className='w-full max-w-xs sm:max-w-sm md:max-w-2xl h-auto'
                />
            </div>

        </div>
    )
}

