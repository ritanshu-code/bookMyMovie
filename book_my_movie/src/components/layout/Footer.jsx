import Image from 'next/image'
import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP, FaTwitter, FaYoutube } from 'react-icons/fa'
import mainIcon from "../../../public/headerAssets/mainWhiteLogo.png"

export default function Footer() {
  return (
    <footer className='bg-[#2b2b2b] text-gray-400text-sm'>
        <div className='border-t border-gray-600 w-full'>
            <div className='flex flex-col items-center py-6'>
                {/* Logo */}
                <Image
                src={mainIcon}
                alt='bookMyScreen'
                width={140}
                height={40}
                />
            </div>
            {/* Social Media Icons */}
            <div className='flex space-x-4 mb-4'>
                <FaFacebookF className='w-8 h-8 p-2 rounded-full bg-gray-700 text-white' />
                <FaTwitter className='w-8 h-8 p-2 rounded-full bg-gray-700 text-white' />
                <FaInstagram className='w-8 h-8 p-2 rounded-full bg-gray-700 text-white' />
                <FaYoutube className='w-8 h-8 p-2 rounded-full bg-gray-700 text-white' />
                <FaPinterestP className='w-8 h-8 p-2 rounded-full bg-gray-700 text-white' />
                <FaLinkedinIn className='w-8 h-8 p-2 rounded-full bg-gray-700 text-white' />
            </div>
            {/* Copyright */}
            <p className='py-4 text-center max-w-4xl text-xs text-white'>
                Copyright 2025 bookMyMovie pvt Ltd. All Rights Reserved. <br />
            </p>
            <small className='text-center text-xs text-white'>
                The content and images used on the site are copyright protected and copyrights vests with the respective owners. The usage of the content and images on this website is intended to promote the works and no endorsement of the artist shall be implied. 
            </small>
        </div>
    </footer>
  )
}

 