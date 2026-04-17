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

            <div className='relative text-white font-sans px-4 py-10'
                style={{
                    backgroundImage: `url(${IMAGE_BASE}${movie.poster_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className='absolute inset-0 bg-black opacity-70'></div>
                <div className='relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-8'>
                    {/* poster */}
                    <div>
                        <img src={`${IMAGE_BASE}${movie.poster_path}`} alt="F1" className='rounded w-52 shadow-md' />
                    </div>
                    {/* details */}
                    <div className='flex flex-col gap-2 '>
                        <h1 className='text-3xl font-bold'>{movie.title}</h1>
                        <p className='text-gray-300 '>{movie.tagline}</p>
                        <div className='bg-[#3a3a3a] flex items-center gap-2  px-4 py-2 rounded-md text-sm w-fit'>
                            <div className='flex items-center gap-5'>
                                <span className=' font-bold'>⭐ {movie.vote_average}</span>
                                <span className=' text-gray-300'> {movie.vote_count} Votes</span>
                                <button className='bg-[#2f2f2f] px-4 py-2 ml-6 hover:bg-[#4a4a4a]'>Rate Now</button>
                            </div>
                        </div>
                        <div className='flex items-center gap-4  text-sm'>
                            <span className='bg-[#3a3a3a] px-4 py-2 rounded-md'>{movie.spoken_languages.map(lang => lang.english_name).join(', ')}</span>
                        </div>
                        <p className='text-sm text-gray-300'>
                            {/* {movie.runtime} mins | {movie.release_date} | {movie.genres.map(genre => genre.name).join(', ')} */}
                        </p>
                        <div>
                            <h2 className='text-xl font-bold mt-4'>About this movie</h2>
                            <p className='text-gray-300 mt-2 text-sm leading-relaxed'>{movie.overview}</p>
                        </div>
                    </div>
                    {/* Share */}
                    <div className='absolute top-0 right-0 cursor-pointer'>
                        <button className='bg-[#2f2f2f] px-4 py-2 hover:bg-[#4a4a4a] rounded-md'>Share</button>
                    </div>
                </div>

            </div>
            <div className='relative z-10 max-w-6xl mx-auto mt-8'>
                <div className='flex'>    
                    {screenTypes.map((type, index) => (
                        <button key={index} className=' px-2 py-2 mx-2 border-2 rounded-md'>{type}</button>
                    ))}
                </div>
                <div className='bg-gray-300 flex items-center gap-4  text-sm mt-4 p-4 rounded-md'>
                    <span className='flex items-center gap-2'>
                        <span className='w-2 h-2 mr-1 font-semibold  bg-black inline-block'></span>
                        <small className='font-semibold text-gray-500'>Available</small>
                    </span>
                    <span>
                        <span className='w-2 h-2 mr-1 font-semibold  bg-yellow-400 inline-block'></span>
                        <small className='font-semibold text-gray-500'>Filling fast</small>
                    </span>
                    <span>
                        <span className='w-2 h-2 mr-1 font-semibold  bg-red-400 inline-block'></span>
                        <small className='font-semibold text-gray-500'>Almost full</small>
                    </span>
                </div>
            <TheaterTimings movieId={movieId}/>
            </div>

        </div>
    )
}

