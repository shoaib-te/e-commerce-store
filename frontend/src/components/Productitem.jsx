import React, { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext';
import { Link } from 'react-router-dom';

function Productitem({id, name, price, image}) {
    const { currncy} =useContext(ShopContext);
  return (
    <Link to={`/product/${id}`} className=' text-gray-700 cursor-pointer rounded-lg  flex flex-col items-center gap-2'>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transform ease-in ' src={image[0]} alt="" />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='font-medium'>{currncy}{price}</p>
    </Link>
  )
}

export default Productitem
