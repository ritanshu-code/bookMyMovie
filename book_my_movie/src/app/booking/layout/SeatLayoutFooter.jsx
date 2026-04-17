"use client"
import { useAuth } from '@/context/AuthContext';
import { useSeatContext } from '@/context/SeatContext';
import { socket } from '@/utils/socket';
import Link from 'next/link';
import React from 'react'

export default function SeatLayoutFooter({showData , location}) {
    const {user} = useAuth();
    console.log(user);
    
    const showId = showData?._id;
    const {isSelectedSeats, selectedSeats} = useSeatContext();
    const handleClickProceed = () => {
        console.log("Clicked");
        
        // send lock request to socket.io server
        socket.emit("lock-seats", {
            showId: showId,
            seatIds: selectedSeats,
            userId: user?._id,
        })
    }
  return (
    <>
        {isSelectedSeats ? (
            <div className='fixed bottom-0 left-0 w-full h-[100px] bg-white border-t border-gray-200 py-4'>

            <div className='bg-white py-3 px-6 flex items-center justify-between z-10'>
                <p className='text-gray-700 font-medium text-base'>You have {selectedSeats.length} Selected</p>
                <Link href={`/booking/shows/${showId}/${location}/checkout`}>
                    <button 
                    onClick={handleClickProceed}
                    className='bg-black cursor-pointer text-white px-6 py-2 rounded-lg font-semibold'>
                        Proceed
                    </button>
                </Link>
            </div>
            </div>
        ) : (
            <div className='fixed bottom-0 left-0 w-full h-[100px] bg-white border-t border-gray-200 py-4'>
        <div className='flex flex-col items-center'>
            <p className='text-xs font-bold text-purple-600 tracking-wider'>
                SCREEN THIS WAY
            </p>
            <div className='flex gap-4 text-xs mt-3 '>
                <div className='flex items-center gap-1'>
                    <div className='w-3 h-3 border rounded-[4px]'></div>
                    Available
                </div>
                <div className='flex items-center gap-1'>
                        <div className='w-3 h-3 border rounded-[4px] bg-gray-200 flex items-center justify-center'>
                            <small>x</small>
                        </div>
                        Occupied
                </div>
                <div className='flex items-center gap-1'>
                    <div className='w-3 h-3 bg-purple-600 rounded-[4px]'></div>
                    Selected
                </div>
            </div>
        </div>
    </div>
        )}
        
    </>
    
  )
}

 