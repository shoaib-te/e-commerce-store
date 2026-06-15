import React from 'react'
import { assets } from '../assets/assets'

function OverPolicy() {
  return (
    <div className='flex-col  flex sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img className='w-12 m-auto mb-5  ' src={assets.exchange_icon} alt="" />
        <h2 className='font-medium mb-1'>Easy Returns</h2>
        <p className='text-gray-500'>we offer hassle free  exchange policy</p>
      </div>
      <div>
        <img className='w-12 m-auto mb-5  ' src={assets.quality_icon} alt="" />
        <h2 className='font-medium mb-1'> 7 day return policy</h2>
        <p className='text-gray-500'> we provide 7 day free return policy</p>
      </div>
      <div>
        <img className='w-12 m-auto mb-5  ' src={assets.support_img} alt="" />
        <h2 className='font-medium mb-1'>Best Customer  Support </h2>
        <p className='text-gray-500'> we provide 24/7 Customer support</p>
      </div>
      
    </div>
  )
}

export default OverPolicy
