import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import useAuth from "../hooks/useAuth";


interface Inputs{

    email:string 
    password: string
}

function login() {
    const [login, setLogin] = useState(false)
  const { signIn, signUp } = useAuth()             //custom hook

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
    if (login) {
      await signIn(data.email, data.password)
    } else {
      await signUp(data.email, data.password)
    }
  }

    return (
        <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
        <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <Image
        src="https://rb.gy/p2hphi"               //initially, we shud add the host name if not used previously in next.ks.config
        layout="fill"                            // if u use, "fill" the parent div shud hve absolute/relative for it to work
        className="-z-10 !hidden opacity-60 sm:!inline"  // condition: we wont see bg image on small screen bcoz we make it hidden , -z-10 index bcoz image shud be behind our text
        objectFit="cover"
        />
        <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"  // left and top to give some gap from the edge of screen
        width={150}
        height={150}
        />          
        
        <form onSubmit={handleSubmit(onSubmit)} className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14">
        
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
        <label className="inline-block w-full">                      {/* for space-y-4 to work, label shud b inline-block, and width full*/}
        <input type="email" className="input" {...register("email", { required: true })} placeholder="Email"/>    
        {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
        </label>
        <label className="inline-block w-full">
        <input type="password" className="input" {...register("password", { required: true })} placeholder="Password"/>  
        {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
        </label>
        </div>
        <button className="w-full rounded bg-[#e50914] py-3 font-semibold ">Sign In</button> {/* buttons r by default cursor pointer css included, so no need to write tht, nd e50914 is original netflix red*/}
        
        
        <div className="text-[gray]">
        New to Netflix? {' '}
        <button type="submit" className="text-white hover:underline">
         Sign up now
        </button>
        </div>

        </form>
        </div>
    );
}

export default login;