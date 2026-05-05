import Image from 'next/image'
import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP, FaTwitter, FaYoutube } from 'react-icons/fa'
import mainIcon from "../../../public/headerAssets/mainWhiteLogo.png"

export default function Footer() {
  return (
    <footer className='bg-[#2b2b2b] text-gray-400 text-sm'>
        <div className='border-t border-gray-600 w-full'>
            <div className='flex flex-col items-center py-4 sm:py-6'>
                {/* Logo */}
                <Image
                src={mainIcon}
                alt='bookMyScreen'
                width={120}
                height={35}
                className='w-24 sm:w-32 md:w-40 h-auto'
                />
            </div>
            {/* Social Media Icons */}
            <div className='flex justify-center gap-2 sm:gap-4 mb-3 sm:mb-4 px-4'>
                <FaFacebookF className='w-6 h-6 sm:w-8 sm:h-8 p-1 sm:p-2 rounded-full bg-gray-700 text-white cursor-pointer hover:bg-[#f84464] transition' />
                <FaTwitter className='w-6 h-6 sm:w-8 sm:h-8 p-1 sm:p-2 rounded-full bg-gray-700 text-white cursor-pointer hover:bg-[#f84464] transition' />
                <FaInstagram className='w-6 h-6 sm:w-8 sm:h-8 p-1 sm:p-2 rounded-full bg-gray-700 text-white cursor-pointer hover:bg-[#f84464] transition' />
                <FaYoutube className='w-6 h-6 sm:w-8 sm:h-8 p-1 sm:p-2 rounded-full bg-gray-700 text-white cursor-pointer hover:bg-[#f84464] transition' />
                <FaPinterestP className='w-6 h-6 sm:w-8 sm:h-8 p-1 sm:p-2 rounded-full bg-gray-700 text-white cursor-pointer hover:bg-[#f84464] transition' />
                <FaLinkedinIn className='w-6 h-6 sm:w-8 sm:h-8 p-1 sm:p-2 rounded-full bg-gray-700 text-white cursor-pointer hover:bg-[#f84464] transition' />
            </div>
            {/* Copyright */}
            <p className='py-3 sm:py-4 text-center max-w-4xl text-xs text-white px-4'>
                Copyright 2025 bookMyMovie pvt Ltd. All Rights Reserved. <br />
            </p>
            <small className='text-center text-xs text-gray-400 block px-4 pb-4'>
                The content and images used on the site are copyright protected and copyrights vests with the respective owners. The usage of the content and images on this website is intended to promote the works and no endorsement of the artist shall be implied. 
            </small>
        </div>
    </footer>
  )
}

 