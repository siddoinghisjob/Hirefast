import React from 'react'
import Footer from '../footer'
import Header from '../header'

export default function Unauthorize() {
  return (
    <div className='flex flex-col w-full justify-between min-h-screen'>
      <Header/>
      <div className='flex gap-2 w-full text-5x md:text-6xl text-prime justify-center items-center'>
        <div className='text-7xl md:text-9xl w-full flex justify-end'>500</div>
        <div className='w-full text-4xl md:text-6xl'>You<br/> Are<br/> Not<br/> Allowed</div>
      </div>
      <Footer/>
    </div>
  )
}
