import Image from 'next/image';
import Link from 'next/link';
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function RecommendedMovies({ movies }) {
console.log("movie id::::",movies.id);

    return (
        <div className="max-w-6xl mx-auto py-6 md:py-8 lg:py-10">
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between items-center px-2 sm:px-4 md:px-0'>
                    <h3 className='text-lg sm:text-xl md:text-2xl font-bold'>Recommended Movies</h3>
                    <button className='text-[#f74565] font-semibold text-sm sm:text-base hover:opacity-80'>See all</button>
                </div>

                {/* Mobile: Horizontal scroll, Tablet+: Grid */}
                <div className="px-2 sm:px-4 md:px-0">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
                        {movies.slice(0, 5).map((movie) => (
                            <Link
                                key={movie._id}
                                href={{
                                    pathname: `/movies/${movie.tmdbId}`,
                                    query: { movieId: movie._id },
                                }}
                            >
                                <div className="flex flex-col gap-2 cursor-pointer group">
                                    <div className="relative overflow-hidden rounded-lg bg-gray-200">
                                        <Image
                                            src={`${IMAGE_BASE}${movie.poster_path}`}
                                            alt={movie.title}
                                            width={200}
                                            height={300}
                                            className="object-cover rounded-lg w-full h-auto group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="font-semibold text-xs sm:text-sm line-clamp-2 group-hover:text-[#f74565] transition">
                                            {movie.title}
                                        </h3>
                                        <div className="text-xs text-gray-500">
                                            ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

