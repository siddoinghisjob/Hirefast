import React from 'react'
import Footer from '../footer'
import Header from '../header'

export default function Error404() {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <Header/>
      <div className='flex text-5xl md:text-6xl text-prime justify-center items-center'>
        <div className='text-7xl md:text-9xl'>404</div>
        <div>Page<br/> Not<br/> Found</div>
      </div>
      <Footer/>
    </div>
  )
}
