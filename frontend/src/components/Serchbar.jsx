import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
function SearchBar() {
    const {  showserch,setshowserch,
        serch,setserch } = useContext(ShopContext)
   const location =useLocation()
   const [visibal,setvisibal]=useState(false)


   useEffect(() => {
  // Check if we are on the collection page
  if (location.pathname.includes('collection')) {
     setvisibal(true)
  } else {
     setvisibal(false)
  }
}, [location])

   
    // Only render the bar if showSearch is true
    return showserch && visibal ? (
        <div className="flex items-center gap-2 p-2 bg-white rounded-full shadow-md max-w-md mx-auto my-4 border border-gray-100">
            {/* Search Icon */}
            <img className='h-5' src={assets.search_icon} alt="" />

            <input 
                autoFocus
                type="text" 
                placeholder="Search products..." 
                className="flex-1 px-2 py-1 text-gray-800 outline-none bg-transparent"
                value={serch}
                onChange={(e) => setserch(e.target.value)}
            />

            {/* Close Search Bar Button */}
            <button 
                onClick={() => setshowserch(false)}
                className="p-1 hover:bg-gray-100 rounded-full mr-2"
            >
                <img className='h-3' src={assets.cross_icon} alt="" />
            </button>
        </div>
    ) : null // Returns nothing if showSearch is false
}

export default SearchBar;
