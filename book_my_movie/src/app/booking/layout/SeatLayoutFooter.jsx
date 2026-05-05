"use client"
import SignInModel from '@/components/auth/SignInModal';
import { useAuth } from '@/context/AuthContext';
import { useSeatContext } from '@/context/SeatContext';
import { socket } from '@/utils/socket';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function SeatLayoutFooter({showData , location}) {
    const {user, toggleModal} = useAuth();
    const router = useRouter();
    
    const showId = showData?._id;
    const {isSelectedSeats, selectedSeats} = useSeatContext();
    const handleClickProceed = () => {
        console.log("Clicked");
        
        // If user is not signed in, open SignIn modal
        if (!user) {
            toggleModal();
            return;
        }
        
        // send lock request to socket.io server
        socket.emit("lock-seats", {
            showId: showId,
            seatIds: selectedSeats,
            userId: user?._id,
        })
        
        // Navigate to checkout page
        router.push(`/booking/shows/${showId}/${location}/checkout`);
    }
  return (
    <>
        {isSelectedSeats ? (
            <div className='fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-2 sm:py-3 md:py-4'>

            <div className='bg-white py-2 sm:py-3 md:py-4 px-2 sm:px-4 md:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between z-10 gap-2 sm:gap-4'>
                <p className='text-xs sm:text-sm md:text-base text-gray-700 font-medium'>You have {selectedSeats.length} Seat{selectedSeats.length !== 1 ? 's' : ''} Selected</p>
                    <button 
                    onClick={handleClickProceed}
                    className='bg-black cursor-pointer text-white px-4 sm:px-6 md:px-8 py-2 md:py-2.5 rounded-lg font-semibold text-xs sm:text-sm md:text-base'>
                        Proceed
                    </button>
            </div>
            </div>
        ) : (
            <div className='fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-2 sm:py-3 md:py-4'>
        <div className='flex flex-col items-center px-2 sm:px-4 md:px-6'>
            <p className='text-[10px] sm:text-xs md:text-xs font-bold text-purple-600 tracking-wider'>
                SCREEN THIS WAY
            </p>
            <div className='flex flex-wrap gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs mt-2 sm:mt-3 justify-center'>
                <div className='flex items-center gap-1'>
                    <div className='w-2 h-2 sm:w-3 sm:h-3 border rounded-[4px]'></div>
                    <span>Available</span>
                </div>
                <div className='flex items-center gap-1'>
                        <div className='w-2 h-2 sm:w-3 sm:h-3 border rounded-[4px] bg-gray-200 flex items-center justify-center'>
                            <small className='text-[8px] sm:text-[10px]'>x</small>
                        </div>
                        <span>Occupied</span>
                </div>
                <div className='flex items-center gap-1'>
                    <div className='w-2 h-2 sm:w-3 sm:h-3 bg-purple-600 rounded-[4px]'></div>
                    <span>Selected</span>
                </div>
            </div>
        </div>
    </div>
        )}
        <SignInModel/>
    </>
    
  )
}

 