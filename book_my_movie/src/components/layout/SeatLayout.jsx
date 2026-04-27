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
            className={`w-9 h-9 m-[2px] rounded-lg border text-sm
        ${seat.status === "occupied"
                    ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                    : isLocked
                        ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
                        : isSelected
                            ? "bg-[#6e52fa] text-white border-[#cec4f7] border-3 cursor-pointer"
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
        <div className="max-w-7xl mx-auto mt-[10px] px-6 pb-4 bg-white h-[calc(100vh-320px)] overflow-y-scroll">

            <div className="flex flex-col items-center justify-center">

                {showData?.seatLayout && (

                    <div className="flex flex-col items-center">

                        {Object.entries(
                            showData.seatLayout.reduce((acc, curr) => {

                                if (!acc[curr.type]) {
                                    acc[curr.type] = { price: curr.price, rows: [] }
                                }

                                acc[curr.type].rows.push(curr)

                                return acc

                            }, {})
                        ).map(([type, { price, rows }]) => (

                            <div key={type} className="mb-12 w-full flex flex-col items-center justify-center">

                                <h2 className="text-center font-semibold text-lg mb-4">
                                    {type} : ₹{price}
                                </h2>

                                <div>

                                    {rows.map((rowObj) => (

                                        <div key={rowObj.row} className="flex items-center">

                                            <div className="w-6 text-right mr-2 text-sm text-gray-600">
                                                {rowObj.row}
                                            </div>

                                            <div className="flex flex-wrap gap-1">

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
            <div className="flex justify-center mt-5">
                <Image
                    src={screen}
                    alt="Screen"
                    width={700}
                    height={100}

                />
            </div>

        </div>
    )
}

