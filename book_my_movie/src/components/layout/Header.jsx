"use client";
import Image from 'next/image';
import SignInModel from '../auth/SignInModal';
import { useAuth } from '@/context/AuthContext';
import { FaUser } from "react-icons/fa";
import mainIcon from "../../../public/headerAssets/mainIcon.png";
import Link from 'next/link';

export default function Header() {
    const {toggleModal, auth, user} = useAuth();
  return (
    <div>
        {/* top header  */}
        <div className='flex justify-between items-center p-3 '>
            {/* left side */}
            <div className='flex gap-8 items-center'>
                {/* logo */}
                <Link href={"/"} >
                <div className='relative w-[140px] h-[40px] items-center'>
                <Image
                src={mainIcon}
                alt='bookMyScreen'
                fill
                />
                </div>
                </Link>
                {/* search bar  */}
                <div>
                    <input type="text" className='w-lg h-2 p-4' placeholder='Search for movies, Events, Plays and activities' />
                </div>
            </div>
            {/* right side */}
            <div className='flex gap-8 items-center'>
                {/* location  */}
                <div>
                    Delhi
                </div>
                {/* profile  */}
                <div className='flex gap-8 items-center'>
                    {/* logo  */}
                    <div>
                        logo
                    </div>
                    {/* details */}
                    {auth ? (
                        <>
                        <span className='cursor-pointer, text-sm font-medium border rounded-full border-gray-300 p-2'>
                            <FaUser className='text-gray-500'/>
                        </span>
                        <span className='text-sm -ml-3 font-medium cursor-pointer hover:text-red-500'>
                            Hi, {user ?user?.name?.split(" ")[0] : "User"}
                        </span>
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
        {/* bottom header */}
        <div className='flex justify-center gap-8 p-3 border-t-2 '>
            <div>Movies</div>
            <div>Plays</div>
            <div>Events</div>
            <div>Activities</div>
            <div>Streams</div>
        </div>
        <SignInModel/>
    </div>
  )
}

