import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-8 sm:gap-14 my-10 mt-40 text-gray-600 text-sm px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        
        {/* Left Section: Logo & Description */}
        <div>
          <img className='mb-5 w-32' src={assets.logo} alt="Logo" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed amet nemo eos aliquam doloremque voluptatum quaerat modi, atque aspernatur impedit quis commodi.
          </p>
        </div>

        {/* Center Section: Company Links */}
        <div>
          <p className='text-xl font-medium mb-5 text-gray-800'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li className='cursor-pointer hover:text-black transition-all'>Home</li>
            <li className='cursor-pointer hover:text-black transition-all'>About us</li>
            <li className='cursor-pointer hover:text-black transition-all'>Delivery</li>
            <li className='cursor-pointer hover:text-black transition-all'>Privacy policy</li>
          </ul>
        </div>

        {/* Right Section: Contact Info */}
        <div>
          <p className='text-xl font-medium mb-5 text-gray-800'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+1-212-456-7890</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Section */}
      <div>
        <hr className='border-gray-300' />
        <p className='py-5 text-sm text-center'>
          Copyright 2024 @ forever.com - All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
