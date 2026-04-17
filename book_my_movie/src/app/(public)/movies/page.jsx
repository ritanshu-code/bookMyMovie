import Header from '@/components/layout/Header'
import MovieFilters from '@/components/movie/MovieFilters'
import MovieList from '@/components/movie/MovieList'
import MovieSlider from '@/components/movie/MovieSlider'
import React from 'react'

export default function page() {
    return (
        <div className="min-h-screen flex flex-col">
            <MovieSlider />
            <div className='flex flex-1 bg-gray-50 '>
                <MovieFilters />
            <MovieList/>
            </div>
        </div>
    )
}

