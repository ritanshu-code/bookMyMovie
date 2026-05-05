import Image from 'next/image'
import React from 'react'
import { events } from '../Constants'

export default function LiveEvents() {
  return (
    <div className='max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-0 py-6 md:py-8 lg:py-10'>
        <h2 className='text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6'>The Best of Live Events</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4'>
            {events.map((event, i) => (
                <div className='rounded-xl overflow-hidden relative group shadow-sm cursor-pointer' key={i}>
                    <Image 
                    src={event.src}
                    alt={event.title}
                    className='object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
                    />

                </div>
            ))}
        </div>
    </div>
    
  )
}

  