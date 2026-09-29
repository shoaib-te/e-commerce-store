import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/Shopcontext'
import { toast } from 'react-toastify'
import ThemeToggle from './ThemeToggle'
function Navbar({ theme, onToggleTheme }) {
  const [showMenu, setShowMenu] = React.useState(false)
  const { settoken, setshowserch, getCartCount, token } = useContext(ShopContext)
 const navigate=useNavigate()

const logout =()=>{
  localStorage.removeItem("token")
  settoken('')
  toast.success("Logout Successfully")
 setTimeout(() => {
   navigate('/login')
 }, 5000);
 
  
}
  
  
  return (
    // Added 'sticky' and 'backdrop-blur' for a modern "glass" effect
    <div className='sticky top-0 z-50 w-full h-16 flex items-center justify-between px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]  bg-white/80 backdrop-blur-md'>
      
      <Link to='/'>
        <img src={assets.logo} className='w-32' alt="Logo" />
      </Link>
      
      {/* Desktop Menu with better spacing and hover states */}
      <ul className='hidden sm:flex gap-8 text-gray-700 text-sm font-medium'>
        {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
          <NavLink 
            key={item}
            to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`} 
            className='flex flex-col items-center gap-1 hover:text-black transition-colors duration-300'
          >
            {({ isActive }) => (
              <>
                <p>{item}</p>
                <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 transition-all duration-300 ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
              </>
            )}
          </NavLink>
        ))}
      </ul>

      <div className='flex items-center gap-5'>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <img onClick={()=>setshowserch(true)} className='w-5 cursor-pointer hover:scale-110 transition-transform' src={assets.search_icon} alt="Search" />
        
        {/* Profile Dropdown with "Hover Bridge" to prevent accidental closing */}
        <div className='group relative'>
          {
            token ? <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="Profile" /> : <Link  to='/login'> <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="Profile" /></Link>
          }
         
         {
          token && <div className='hidden group-hover:block absolute top-full right-0 pt-4 transition-all'>
            <div className='flex flex-col gap-2 w-40 py-3 px-5 bg-white border border-gray-100 text-gray-500 rounded-lg shadow-xl animate-fadeIn'>
              <p className='cursor-pointer hover:text-black transition-colors'>My Profile</p>
              <p onClick={()=>navigate('/orders ')} className='cursor-pointer hover:text-black transition-colors'>Orders</p>
              <hr className='border-gray-100' />
              <p onClick={logout} className='cursor-pointer hover:text-red-600 transition-colors'>Logout</p>
            </div>
          </div>
         } 
        </div>

        {/* Cart Icon with Fixed Badge Position */}
        <Link to="/cart" className='relative group'>
          <img className='w-5 cursor-pointer group-hover:scale-110 transition-transform' src={assets.cart_icon} alt="Cart" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] font-bold'>
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Toggle */}
        <img onClick={() => setShowMenu(true)} className='w-5 cursor-pointer sm:hidden' src={assets.menu_icon} alt="Menu" />
      </div>

      {/* Mobile Sidebar with Overlay */}
      <div className={`fixed sm:hidden inset-0 bg-black/20 z-50 transition-opacity duration-300 ${showMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setShowMenu(false)}>
        <div 
          className={`absolute top-0 right-0 bottom-0 w-full  bg-white transition-transform duration-300 ease-in-out ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the menu
        >
          <div className='flex flex-col text-gray-600 bg-white h-full'>
            <div onClick={() => setShowMenu(false)} className='flex items-center gap-4 p-4 cursor-pointer border-b hover:bg-gray-50'>
              <img className='h-4 rotate-180 opacity-60' src={assets.dropdown_icon} alt="" />
              <p className='font-medium'>Back</p>
            </div>
            {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
              <NavLink 
                key={item}
                onClick={() => setShowMenu(false)}
                className='py-4 pl-6 border-b hover:text-black hover:bg-gray-50 bg-white  transition-all'
                to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
              >
                {item}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
