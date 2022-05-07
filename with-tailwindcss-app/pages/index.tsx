import type { NextPage } from 'next'
import Header from '../Components/Header'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Home-Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <div className='flex flex-col items-center justify-center min-h-screen py-2 text-[#e5e5e5]'>A NETFLIX CLONE BY SAALIM</div>
    
    </div>
  )
}

export default Home
