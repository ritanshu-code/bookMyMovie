import Image from 'next/image';
import Link from 'next/link';
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function RecommendedMovies({ movies }) {
console.log("movie id::::",movies.id);

    return (
        <div className="flex flex-col justify-center items-center mt-5 gap-5">
            <div className='flex flex-col gap-3'>
                <div className='flex justify-between'>
                    <h3 className='text-left font-bold text-xl'>Recommended Movies</h3>
                    <button className='text-red-400 font-semibold'>See all</button>
                </div>

                <div className="flex gap-5">
                    {movies.slice(0, 5).map((movie) => (
                        <Link
                            key={movie._id}
                            href={{
                                pathname: `/movies/${movie.tmdbId}`,
                                query: { movieId: movie._id },
                            }}
                        >
                            <div
                                key={movie.id}
                                className="w-[230px]" >
                                <Image
                                    src={`${IMAGE_BASE}${movie.poster_path}`}
                                    alt={movie.title}
                                    width={230}
                                    height={330}
                                    className="object-cover rounded-lg"
                                />
                                <h3 className="mt-2 font-semibold text-sm">
                                    {movie.title}
                                </h3>

                                <div className="text-sm text-gray-500">
                                    ⭐ {movie.vote_average} · {movie.release_date}
                                </div>
                            </div>

                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

