import MuiModal from "@mui/material/Modal"
import { useRecoilState, useRecoilValue } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"
import {CheckIcon, PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon} from "@heroicons/react/outline"
import { useEffect, useState } from "react"
import { Movie, Element, Genre } from "../typings"
import ReactPlayer from "react-player/lazy"
import { FaPlay } from "react-icons/fa"

function Modal(){
    const [showModal,setShowModal] = useRecoilState(modalState)
    const [movie, setMovie] = useRecoilState(movieState)        //recoil state ka memory aleg, normal use state memory is stored locally, i think recoil state memory is tht direct stored memory for state management, both different memory
    const [trailer, setTrailer] = useState("")
    const [genres,setGenres] = useState<Genre[]>([])
    const [muted,setMuted] = useState(false)
    
    useEffect(() => {
        if (!movie) return                   //if no movie return
    
        async function fetchMovie() {
          const data = await fetch(
            `https://api.themoviedb.org/3/${
              movie?.media_type === 'tv' ? 'tv' : 'movie'    //if tv? then we add tv in the url, if not tv we add movie
            }/${movie?.id}?api_key=${
              process.env.NEXT_PUBLIC_API_KEY
            }&language=en-US&append_to_response=videos`   // append_to_response gives movies, cant add in common request.tsx bcoz this returns only one thing/video
          ).then((response) => response.json())

          if (data?.videos) {         // if data contains videos 
            const index = data.videos.results.findIndex(               //finding index of video, finding the type-trailer in the api
              (element: Element) => element.type === 'Trailer'         // in interface we created one, in typings.d.ts
            )
            setTrailer(data.videos?.results[index]?.key)               // every result from json, gives us key, key renders us the utube video
          }
          if (data?.genres) {
            setGenres(data.genres)
          }
        }
    
        fetchMovie()
      }, [movie])    // every time movie changes

    
    

    const handleClose= ()=>{
        setShowModal(false)
    }

    return (
        <MuiModal
        open={showModal}
        onClose={handleClose}
        className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"           //over-write Mui css, mx-auto to keep modal in center
        >
        <>
          <button
            className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"               /*! means (forcing or important) !z-40 so it sits on top of modal */
            onClick={handleClose}
          >
            <XIcon className="h-6 w-6" />
          </button>
        <div className="relative pt-[56.25%]">  {/* this is where we get movie, videos, and to make the video responsive, different size of screen we add css position: relative */}
        <ReactPlayer                                               // react player basically uses the key we get from tmdb api, and renders the video on our screen
            url={`https://www.youtube.com/watch?v=${trailer}`}           //the trailer has the key, which we assigned in useEffect, key references the particular utube trailer
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
        />
         <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>
              <button className="modalButton" >
                <PlusIcon className="h-7 w-7" />
              </button>
              <button className="modalButton">
                <ThumbUpIcon className="h-6 w-6" />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="h-6 w-6" />
              ) : (
                <VolumeUpIcon className="h-6 w-6" />                /* ternary operator, toggle between volume up&down */
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">   {/* rounded-b-md -> rounded but only on bottom */}
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie!.vote_average * 10}% Match                                {/* gives percentage match */}
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span>{' '}
                  {genres.map((genre) => genre.name).join(', ')}                      {/* to display genre as action,comedy,romance-> by joining comma between them */}
                </div>

                <div>
                  <span className="text-[gray]">Original language:</span>{' '}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{' '}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal 