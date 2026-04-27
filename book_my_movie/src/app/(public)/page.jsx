"use client";
import MovieSlider from '@/components/movie/MovieSlider';
import RecommendedMovies from '@/components/movie/RecommendedMovies';

import { useLoadUser } from '@/hooks/useLoadUser';
import FullScreenLoader from '@/components/ui/FullScreenLoader';
import { useEffect, useState } from 'react';
import LiveEvents from '@/components/ui/LiveEvents';




export default function Page() {
    const {isLoading} = useLoadUser();
    const [movies, setMovies] = useState([]);
    // Fetch movies data via api
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch("/api/movies", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Failed to fetch movies data");
                }
                setMovies(data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchMovies();
    }, [])


    if(isLoading){
        return <FullScreenLoader />;
    }
    return (
        <div className='min-h-screen  '>
                        
            <MovieSlider />
            <RecommendedMovies movies={movies} />
            <LiveEvents/>
        </div>
    )
}

