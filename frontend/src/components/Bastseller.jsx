import React, { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext';
import Title from './Title';
import Productitem from './Productitem';

function Bastseller() {
    const {products} =useContext(ShopContext);
    const [bastProducts, setBastProducts] = React.useState([]);

    React.useEffect(() => {
        const sortedProducts = products.filter((item)=> item?.bestseller) ;
        setBastProducts(sortedProducts.slice(0, 5));
    }, [products]);
  return (
    <div className='my-10'>
    <div className='text-center py-8 text-3xl'>
      <Title text1={"BAST"} text2={"SELLERS"}/>
        <p className='text-gray-600 w-3/4 m-auto text-xs sm:text-sm md:text-base'>Discover our bestsellers - the most popular products among our customers</p>

    </div>
    { /* Product Grid with Responsive Columns and Gap */ }
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        {
            bastProducts.map((product ) => (
                <Productitem key={product._id} id={product._id} name={product.name} price={product.price} image={product.image} />
            ))
        } 
        </div>
      
    </div>
  )
}

export default Bastseller
