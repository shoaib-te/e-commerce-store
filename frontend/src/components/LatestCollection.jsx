import React, { useEffect } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from './Title';
import Productitem from './Productitem';

function LatestCollection() {

    const { products } = React.useContext(ShopContext);
    const [latestProducts, setLatestProducts] = React.useState([]);
    // LatestCollection.jsx
useEffect(() => {
    if (Array.isArray(products)) {
        setLatestProducts(products.slice(0, 10));
    }
}, [products]);

  return (
    <div className='my-10'>
    <div className='text-center py-8 text-3xl'>
      <Title text1={"Latest"} text2={"Collection"}/>
      <p className='text-gray-600 w-3/4 m-auto text-xs sm:text-sm md:text-base'>Check out our latest collection of products</p>
    </div>
   { /* Product Grid with Responsive Columns and Gap */ }
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        {
            latestProducts.map((product ) => (
                <Productitem key={product._id} id={product._id} name={product.name} price={product.price} image={product.image} />
            ))
        } 
        </div>

    </div>
   
  )
}

export default LatestCollection
