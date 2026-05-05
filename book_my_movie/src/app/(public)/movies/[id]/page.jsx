import { getMovieById } from '@/services/movieService';
import TheaterTimings from '@/components/movie/TheaterTimings';

export default async function page({ params, searchParams }) {
    const screenTypes = ["2D", "3D", "Wheelchair Accessible", "4DX", "IMAX", "Premium seats", "Recliners", "PVR PXL", "Laser", "Dolby Atmos"];
    const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
    
    const { id } = await params;
    const { movieId } = await searchParams;
    console.log("ID:", id);
    console.log("movieId:", movieId);

    const movie = await getMovieById(id);

    return (
        <div className=''>

            <div className='relative text-white font-sans px-2 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10'
                style={{
                    backgroundImage: `url(${IMAGE_BASE}${movie.poster_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className='absolute inset-0 bg-black opacity-70'></div>
                <div className='relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8'>
                    {/* poster */}
                    <div className='flex-shrink-0'>
                        <img src={`${IMAGE_BASE}${movie.poster_path}`} alt="F1" className='rounded w-32 sm:w-40 md:w-52 shadow-md' />
                    </div>
                    {/* details */}
                    <div className='flex flex-col gap-2 flex-1 min-w-0'>
                        <h1 className='text-xl sm:text-2xl md:text-3xl font-bold line-clamp-2'>{movie.title}</h1>
                        <p className='text-gray-300 text-xs sm:text-sm line-clamp-2'>{movie.tagline}</p>
                        <div className='bg-[#3a3a3a] flex items-center gap-2 px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm w-fit overflow-x-auto'>
                            <div className='flex items-center gap-2 sm:gap-5 whitespace-nowrap'>
                                <span className='font-bold'>⭐ {movie.vote_average}</span>
                                <span className='text-gray-300 text-xs sm:text-sm'>{movie.vote_count} Votes</span>
                                <button className='bg-[#2f2f2f] px-2 sm:px-4 py-1 sm:py-2 ml-2 sm:ml-6 hover:bg-[#4a4a4a] text-xs sm:text-sm'>Rate Now</button>
                            </div>
                        </div>
                        <div className='flex items-center gap-2 sm:gap-4 text-xs sm:text-sm overflow-x-auto'>
                            <span className='bg-[#3a3a3a] px-2 sm:px-4 py-1 sm:py-2 rounded-md whitespace-nowrap'>{movie.spoken_languages.map(lang => lang.english_name).join(', ')}</span>
                        </div>
                        <p className='text-xs sm:text-sm text-gray-300'>
                            {/* {movie.runtime} mins | {movie.release_date} | {movie.genres.map(genre => genre.name).join(', ')} */}
                        </p>
                        <div>
                            <h2 className='text-lg sm:text-xl font-bold mt-4'>About this movie</h2>
                            <p className='text-gray-300 mt-2 text-xs sm:text-sm leading-relaxed line-clamp-4'>{movie.overview}</p>
                        </div>
                    </div>
                    {/* Share */}
                    <div className='absolute top-4 right-2 sm:right-4 md:top-8 md:right-6 cursor-pointer flex-shrink-0'>
                        <button className='bg-[#2f2f2f] px-2 sm:px-4 py-1 sm:py-2 hover:bg-[#4a4a4a] rounded-md text-xs sm:text-sm'>Share</button>
                    </div>
                </div>

            </div>
            <div className='relative z-10 max-w-6xl mx-auto mt-6 sm:mt-8 px-2 sm:px-4 md:px-0'>
                <div className='flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6'>    
                    {screenTypes.map((type, index) => (
                        <button key={index} className='px-2 sm:px-3 py-1 sm:py-2 border-2 rounded-md text-xs sm:text-sm border-gray-300 hover:border-gray-600 transition'>{type}</button>
                    ))}
                </div>
                <div className='bg-gray-300 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-xs sm:text-sm mt-4 p-3 sm:p-4 rounded-md'>
                    <span className='flex items-center gap-2'>
                        <span className='w-2 h-2 mr-1 font-semibold bg-black inline-block flex-shrink-0'></span>
                        <small className='font-semibold text-gray-500'>Available</small>
                    </span>
                    <span className='flex items-center gap-2'>
                        <span className='w-2 h-2 mr-1 font-semibold bg-yellow-400 inline-block flex-shrink-0'></span>
                        <small className='font-semibold text-gray-500'>Filling fast</small>
                    </span>
                    <span className='flex items-center gap-2'>
                        <span className='w-2 h-2 mr-1 font-semibold bg-red-400 inline-block flex-shrink-0'></span>
                        <small className='font-semibold text-gray-500'>Almost full</small>
                    </span>
                </div>
            <TheaterTimings movieId={movieId}/>
            </div>

        </div>
    )
}

