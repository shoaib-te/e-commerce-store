import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/Shopcontext";
import { assets } from "../assets/assets";
import Relatedproduct from "../components/Relatedproduct";

function Product() {
  const { productid } = useParams();
  const { products, currency,addItem,} = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState(""); // State for the main large image
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productid) {
        setProductData(item);
        setImage(item.image[0]); // Set default main image
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productid, products]);

  if (!productData) {
    return <div className="opacity-0"></div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data Container */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* -------- Product Images -------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
  <div className="flex sm:flex-col overflow-x-auto snap-x snap-mandatory scrollbar-hide sm:overflow-y-scroll sm:scrollbar-hide justify-start sm:justify-normal gap-2 sm:gap-0 sm:w-[18.7%] w-full p-2 sm:p-0">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[30%] sm:w-full snap-center rounded-md sm:mb-3 sm:rounded flex-shrink-0 cursor-pointer border hover:border-orange-500 hover:shadow-md transition-all"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info -------- */}
        <div className="flex-1">
          <h1 className="font-medium text-xl sm:text-2xl md:text-3xl mt-2 leading-tight">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
<p className="mt-5 text-gray-500 w-full sm:w-4/5">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex flex-wrap gap-3">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-3 px-6 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full text-sm font-medium min-w-[44px] transition-all ${item === size ? "border-orange-500 bg-orange-50 shadow-md" : ""}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() =>addItem(productData._id,size) }
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 w-full sm:w-max"
          >
            ADD TO CART
          </button>
          <hr className='mt-8 w-full sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
            {/* ---------- Description & Review Section ---------- */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm cursor-pointer'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>
         <Relatedproduct category={productData.category} subCategory={productData.subCategory} />
      {/* ---------- Related Products ---------- */}
      {/* Assumes you have a RelatedProducts component that takes category and subCategory props */}
      {/*  */}

    </div> // Closing main div
  );
}

export default Product;
