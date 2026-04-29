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
            <div className="flex justify-between items-center px-6 py-4">
                {/* Left - Logo */}
                <Link href="/">
                    <div className='relative w-[140px] h-[40px] items-center hover:opacity-80 transition cursor-pointer'>
                        <Image
                            src={mainIcon}
                            alt='bookMyScreen'
                            fill
                        />
                    </div>
                </Link>

                {/* Middle - Text */}
                <div className="flex-1 text-center">
                    <h1 className="text-xl font-semibold text-gray-800">Review your Booking</h1>
                </div>

                {/* Right - Profile */}
                <Link href={`/profile/${user?._id}`}>
                    <div className='p-2 rounded-full bg-gray-100 hover:bg-[#f74565] hover:text-white transition cursor-pointer'>
                        <FaUser className='text-gray-600 hover:text-white text-lg'/>
                    </div>
                </Link>
            </div>
        </div>
    )
}
