import Image from "next/image";
import { languages, movies } from "../Constants";
import { getUpcomingMovies } from "@/services/movieService";

export default async function MovieList() {
    const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
    
    const upCommingMovies = await getUpcomingMovies();
    console.log(upCommingMovies);
    
  return (
    <div className="p-7 flex flex-col w-full ">
        <div className="flex flex-wrap gap-2 mb-2">
            {languages.map((language, index) => (
                <div key={index} className=''>
                    <button className='px-2 py-2 border-2 border-gray-200 text-red-500 hover:bg-gray-100 rounded-full text-sm'>{language}</button>
                </div>
            ))}
        </div>
        <div className="flex justify-between items-center bg-white p-5 rounded-md mb-5">
            <h1 className="">
                Coming Soon
            </h1>
            <a href="" className="text-red-500">
                Explore Upcomming Movies <span>→</span>
            </a>
        </div>

        <div className="flex flex-wrap gap-5">
                    {upCommingMovies.results.map((movie, index) => (
                        <div key={index}>
                            <Image
                                src={`${IMAGE_BASE}${movie.poster_path}`}
                                alt={movie.title}
                                width={230}
                                height={330}
                                className="object-cover rounded-lg"
                            />
                            {movie.title}
                            <div className="text-sm text-gray-500">
                                ⭐ {movie.vote_average} · {movie.release_date}
                            </div>
                        </div>
                    ))}

                </div>
    </div>
  )
}

