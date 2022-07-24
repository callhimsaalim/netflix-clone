import Image from "next/image";
import { useEffect, useState } from "react";
import { baseUrl } from "../constants/movie";
import { Movie } from "../typings";
import {FaPlay} from "react-icons/fa"
import { InformationCircleIcon } from '@heroicons/react/outline'
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";

interface Props{
    netflixOriginals: Movie[]
    
}
function Banner({netflixOriginals}:Props){
    const [movie, setMovie] = useState<Movie | null>(null)
    const [showModal,setShowModal] = useRecoilState(modalState)
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState)


    useEffect(() => {
        setMovie(
            netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
        )
      }, [netflixOriginals]) // everytime netflixoriginals array changes, this use effect will run

    console.log(movie);
    
    return(
        <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh]  lg:pb-12"> {/* removed lg:justify-end*/}
        <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">    {/*space-y-2 vertical space between children, py-16, padding top 16px, pb-12 padding bottom 12px, justify end keeps text in middle, lg:h-[65vh] -> */}
        <Image
          layout="fill"
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          objectFit="cover"
        />

        </div>

        <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl"> {/*default is small screen size text-2xl --text font size, font-bold*/}
            {movie?.title || movie?.name || movie?.original_name }
        </h1>

        <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">     {/* md: max-w-lg on medium breakpoint max width is large*/}
            {movie?.overview}
        </p>

        <div className="flex space-x-3">                      {/*to make buttons horizontlly side by side*/}
                <button className="bannerButton bg-white text-black">
                <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
                Play
                </button>
                <button className="bannerButton bg-[gray]/70" onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}>
                <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" /> More Info
                </button>
        </div>
    </div>
    );
}
export default Banner