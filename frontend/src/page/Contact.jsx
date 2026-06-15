import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newslitterbox from '../components/Newslitterbox'

function Contact() {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        
        {/* Contact Image */}
        <img className='w-full md:max-w-[480px] rounded-lg shadow-sm' src={assets.contact_img} alt="Contact Us" />

        {/* Contact Details */}
        <div className='flex flex-col justify-center items-start gap-6 text-gray-600'>
          
          <p className='font-semibold text-xl text-gray-800'>Our Store</p>
          <p>54709 Willms Station <br /> Suite 350, Washington, USA</p>
          
          <p>Tel: (415) 555-0132 <br /> Email: admin@forever.com</p>

          <p className='font-semibold text-xl text-gray-800'>Careers at Forever</p>
          <p>Learn more about our teams and job openings.</p>

          {/* Styled Button */}
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>
            Explore Jobs
          </button>

        </div>
      </div>
      <Newslitterbox/>

    </div>
  )
}

export default Contact
