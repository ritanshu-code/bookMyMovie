import { languages } from "../Constants";

export default function MovieFilters() {

    return (
        <div className='flex flex-col p-7 w-[30%]'>
            <p className='mb-5'>Filters</p>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2 bg-white p-4 rounded-md'>
                    <div className='flex justify-between items-center '>
                        <span>Languages</span>
                        <button className='text-red-500'>Clear</button>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        {languages.map((language, index) => (
                            <div key={index} className=''>
                                <button className='px-2 py-2 border border-gray-200 text-red-500 hover:bg-gray-100 rounded-md'>{language}</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex justify-between items-center bg-white p-4'>
                    <span>Genres</span>
                    <button className='text-red-500'>Clear</button>
                </div>
                <div className='flex justify-between items-center bg-white p-4'>
                    <span>Format</span>
                    <button className='text-red-500'>Clear</button>
                </div>
                <button className='px-2 py-2 border border-red-500 text-red-500 hover:bg-gray-100 rounded-md transition'>Browse By Cinemas</button>
            </div>
        </div>
    )
}

