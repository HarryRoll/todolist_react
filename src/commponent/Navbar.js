import React from 'react'
import { Outlet } from 'react-router-dom'

function Navbar() {
  return (
    <>    
    <div className="py-8 px-44 w-full bg-blue-400">
        <h1 className="text-2xl font-bold text-white">
        TO DO LIST APP
        </h1>
    </div>
    
    <Outlet/>
    </>
  )
}

export default Navbar
