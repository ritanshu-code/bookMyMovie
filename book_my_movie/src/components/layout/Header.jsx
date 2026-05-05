"use client";
import Image from 'next/image';
import SignInModel from '../auth/SignInModal';
import { useAuth } from '@/context/AuthContext';
import { FaUser } from "react-icons/fa";
import { IoLocationSharp, IoSearch } from "react-icons/io5";
import mainIcon from "../../../public/headerAssets/mainIcon.png";
import Link from 'next/link';

export default function Header() {
    const {toggleModal, auth, user} = useAuth();
  return (
    <div className="bg-white shadow-sm">
        {/* top header  */}
        <div className='flex justify-between items-center px-2 sm:px-4 md:px-6 py-3 sm:py-4'>
            {/* left side */}
            <div className='flex gap-2 sm:gap-4 md:gap-6 items-center flex-1 min-w-0'>
                {/* logo */}
                <Link href={"/"} >
                <div className='relative w-[100px] sm:w-[120px] md:w-[140px] h-[30px] sm:h-[35px] md:h-[40px] items-center hover:opacity-80 transition flex-shrink-0'>
                <Image
                src={mainIcon}
                alt='bookMyScreen'
                fill
                />
                </div>
                </Link>
                {/* search bar - hidden on mobile  */}
                <div className='hidden sm:flex flex-1 max-w-md md:max-w-2xl'>
                    <div className='flex items-center gap-2 sm:gap-3 bg-gray-100 rounded-full px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-200 transition w-full'>
                        <IoSearch className='text-gray-400 text-sm sm:text-lg flex-shrink-0' />
                        <input 
                            type="text" 
                            className='flex-1 bg-transparent outline-none text-xs sm:text-sm text-gray-700 placeholder-gray-500 min-w-0' 
                            placeholder='Search movies, Events...' 
                        />
                    </div>
                </div>
            </div>
            {/* right side */}
            <div className='flex gap-2 sm:gap-4 md:gap-6 items-center flex-shrink-0'>
                {/* location - hidden on mobile  */}
                <div className='hidden sm:flex items-center gap-1 md:gap-2 text-gray-700 font-medium hover:text-[#f84464] cursor-pointer transition whitespace-nowrap'>
                    <IoLocationSharp className='text-sm md:text-lg text-[#f84464]' />
                    <span className='text-xs sm:text-sm md:text-base'>Delhi</span>
                </div>
                {/* profile  */}
                <div className='flex items-center gap-1 sm:gap-2 md:gap-4'>
                    {/* profile icon  */}
                    {auth ? (
                        <>
                        <div className='flex items-center gap-1 sm:gap-2 md:gap-3'>
                            <div className='p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-[#f84464] hover:text-white transition cursor-pointer'>
                                <FaUser className='text-xs sm:text-base text-gray-600 hover:text-white'/>
                            </div>
                            <Link href={`/profile/${user?._id}`}>
                                <span className='hidden sm:inline text-xs sm:text-sm md:text-base font-medium cursor-pointer hover:text-[#f84464] transition whitespace-nowrap'>
                                    Hi, {user ? user?.name?.split(" ")[0] : "User"}
                                </span>
                            </Link>
                        </div>
                        </>
                    ) : (
                        <button 
                    onClick={() => toggleModal()}
                    className='bg-[#f84464] hover:bg-[#e63a52] cursor-pointer text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium transition shadow-sm hover:shadow-md'>
                        Sign in
                    </button>
                    )}
                </div>
            </div>
        </div>
        {/* bottom header - responsive navigation */}
        <div className='flex justify-center gap-2 sm:gap-4 md:gap-8 px-2 sm:px-4 md:px-6 py-2 sm:py-3 border-t border-gray-200 bg-gray-50 overflow-x-auto'>
            <Link href="/">
                <div className='text-gray-700 font-medium hover:text-[#f84464] cursor-pointer transition hover:border-b-2 hover:border-[#f84464] pb-1 text-xs sm:text-sm md:text-base whitespace-nowrap'>Movies</div>
            </Link>
            <Link href="/">
                <div className='text-gray-700 font-medium hover:text-[#f84464] cursor-pointer transition hover:border-b-2 hover:border-[#f84464] pb-1 text-xs sm:text-sm md:text-base whitespace-nowrap'>Plays</div>
            </Link>
            <Link href="/">
                <div className='text-gray-700 font-medium hover:text-[#f84464] cursor-pointer transition hover:border-b-2 hover:border-[#f84464] pb-1'>Events</div>
            </Link>
            <Link href="/">
                <div className='text-gray-700 font-medium hover:text-[#f84464] cursor-pointer transition hover:border-b-2 hover:border-[#f84464] pb-1'>Activities</div>
            </Link>
            <Link href="/">
                <div className='text-gray-700 font-medium hover:text-[#f84464] cursor-pointer transition hover:border-b-2 hover:border-[#f84464] pb-1'>Streams</div>
            </Link>
        </div>
        <SignInModel/>
    </div>
  )
}

