"use client";
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { FaUser } from "react-icons/fa";
import mainIcon from "../../../public/headerAssets/mainIcon.png";
import Link from 'next/link';

export default function CheckoutHeader() {
    const { user } = useAuth();

    return (
        <div className="bg-white shadow-md border-b border-gray-200">
            <div className="flex justify-between items-center px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 gap-2">
                {/* Left - Logo */}
                <Link href="/">
                    <div className='relative w-20 sm:w-24 md:w-32 h-8 sm:h-10 md:h-10 items-center hover:opacity-80 transition cursor-pointer flex-shrink-0'>
                        <Image
                            src={mainIcon}
                            alt='bookMyScreen'
                            fill
                        />
                    </div>
                </Link>

                {/* Middle - Text */}
                <div className="flex-1 text-center min-w-0">
                    <h1 className="text-sm sm:text-base md:text-xl font-semibold text-gray-800 truncate">Review your Booking</h1>
                </div>

                {/* Right - Profile */}
                <Link href={`/profile/${user?._id}`}>
                    <div className='p-1 sm:p-1.5 md:p-2 rounded-full bg-gray-100 hover:bg-[#f74565] hover:text-white transition cursor-pointer flex-shrink-0'>
                        <FaUser className='text-gray-600 hover:text-white text-sm sm:text-base md:text-lg'/>
                    </div>
                </Link>
            </div>
        </div>
    )
}
