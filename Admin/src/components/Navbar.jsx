import React from 'react'
import { assets } from '../assets/assets'


function Navbar({setToken}) {

  return (
    <div className='flex items-center justify-between  font-medium pl-5 pr-5 border-b-2 border-gray-300 py-4'>
      {/* Logo */}
      <img 
        // onClick={() => navigate('/')} 
        src={assets.logo} 
        className='w-36 cursor-pointer' 
        alt="logo" 
      />
      {/* Action Button */}
      <div className='flex items-center gap-6'>
          <button 
            onClick={() => setToken('')} 
            className='bg-black text-white px-8 py-2 rounded-full text-sm font-light hover:bg-gray-800 transition-all'
          >
            Logout
          </button>
      </div>
    </div>
  )
}

export default Navbar
