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
        <div className='flex justify-between items-center px-6 py-4'>
            {/* left side */}
            <div className='flex gap-6 items-center flex-1'>
                {/* logo */}
                <Link href={"/"} >
                <div className='relative w-[140px] h-[40px] items-center hover:opacity-80 transition'>
                <Image
                src={mainIcon}
                alt='bookMyScreen'
                fill
                />
                </div>
                </Link>
                {/* search bar  */}
                <div className='flex-1 max-w-2xl'>
                    <div className='flex items-center gap-3 bg-gray-100 rounded-full px-4 py-3 hover:bg-gray-200 transition'>
                        <IoSearch className='text-gray-400 text-lg' />
                        <input 
                            type="text" 
                            className='flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500' 
                            placeholder='Search for movies, Events, Plays and activities' 
                        />
                    </div>
                </div>
            </div>
            {/* right side */}
            <div className='flex gap-6 items-center'>
                {/* location  */}
                <div className='flex items-center gap-2 text-gray-700 font-medium hover:text-[#f84464] cursor-pointer transition'>
                    <IoLocationSharp className='text-lg text-[#f84464]' />
                    <span>Delhi</span>
                </div>
                {/* profile  */}
                <div className='flex items-center gap-4'>
                    {/* profile icon  */}
                    {auth ? (
                        <>
                        <div className='flex items-center gap-3'>
                            <div className='p-2 rounded-full bg-gray-100 hover:bg-[#f84464] hover:text-white transition cursor-pointer'>
                                <FaUser className='text-gray-600 hover:text-white'/>
                            </div>
                            <Link href={`/profile/${user?._id}`}>
                                <span className='text-sm font-medium cursor-pointer hover:text-[#f84464] transition whitespace-nowrap'>
                                    Hi, {user ? user?.name?.split(" ")[0] : "User"}
                                </span>
                            </Link>
                        </div>
                        </>
                    ) : (
                        <button 
                    onClick={() => toggleModal()}
                    className='bg-[#f84464] hover:bg-[#e63a52] cursor-pointer text-white px-6 py-2 rounded-full text-sm font-medium transition shadow-sm hover:shadow-md'>
                        Sign in
                    </button>
                    )}
                </div>
            </div>
        </div>
        {/* bottom header */}
        <div className='flex justify-center gap-8 px-6 py-3 border-t border-gray-200 bg-gray-50'>
            <Link href="/">
                <div className='text-gray-700 font-medium hover:text-[#f84464] cursor-pointer transition hover:border-b-2 hover:border-[#f84464] pb-1'>Movies</div>
            </Link>
            <Link href="/">
                <div className='text-gray-700 font-medium hover:text-[#f84464] cursor-pointer transition hover:border-b-2 hover:border-[#f84464] pb-1'>Plays</div>
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

