import Image from 'next/image'
import React from 'react'
import { events } from '../Constants'

export default function LiveEvents() {
  return (
    <div className='max-w-screen-xl mx-auto px-4 py-10'>
        <h2 className='text-2xl font-semibold mb-6'>The Best of Live Events</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4'>
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

  