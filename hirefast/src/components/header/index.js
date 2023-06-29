import React from 'react'
import {Link} from "react-router-dom";
export default function Header() {
  return (
    <div className='w-full'>
    <Link to="/">
          <header className="flex h-20 text-4xl md:text-5xl w-full font-bold justify-center gap-4 items-center bg-gradient-to-r from-cyan-500 via-green-300 to-cyan-500">
            <img src="/assets/images/fast-speed-icon.svg" alt="fast icon" className='h-14'/>
            <span className="font-mono flex justify-center gap-0 items-center">
              HireFast
            </span>
          </header>
        </Link>
    </div>
  )
}
