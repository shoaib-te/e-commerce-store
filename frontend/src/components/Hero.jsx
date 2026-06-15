import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='relative w-full h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden'>
      {/* Parallax Background Image */}
      <div 
        className='absolute inset-0 w-full h-full bg-cover bg-center bg-fixed bg-no-repeat transform scale-105'
        style={{ backgroundImage: `url(${assets.hero_img})` }}
      />
      
      {/* Dark Overlay for better text readability */}
      <div className='absolute inset-0 bg-black/30' />
      
      {/* Content Container */}
      <div className='relative z-10 flex items-center justify-center h-full px-4 sm:px-10'>
        <div className='text-center text-white max-w-3xl mx-auto animate-fade-in-up'>
          {/* Subtitle */}
          <div className='flex items-center justify-center gap-2 mb-4 animate-fade-in'>
            <p className='w-8 md:w-11 h-[2px] bg-white/80'></p>
            <p className='font-medium text-sm md:text-base tracking-widest uppercase'>Welcome to Our Store</p>
            <p className='w-8 md:w-11 h-[2px] bg-white/80'></p>
          </div>
          
          {/* Main Title */}
          <h1 className='prata-regular text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 animate-slide-up'>
            Discover Your Style
          </h1>
          
          {/* Description */}
          <p className='text-base sm:text-lg text-white/90 mb-8 max-w-xl mx-auto animate-fade-in delay-200'>
            Explore our latest collection of trendy fashion for men, women, and kids. Quality meets style in every piece.
          </p>
          
          {/* CTA Button */}
          <Link 
            to='/collection' 
            className='inline-block px-8 py-3 bg-white text-gray-900 font-semibold text-sm md:text-base rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 ease-out shadow-lg animate-fade-in delay-400'
          >
            SHOP NOW
          </Link>
        </div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent' />
    </div>
  );
}

export default Hero;
