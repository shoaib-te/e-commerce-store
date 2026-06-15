import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shopcontext";
import { assets } from "../assets/assets"; // Assuming you have a dropdown icon here
import Title from "../components/Title";
import Productitem from "../components/Productitem";

function Collection() {
  const { products,  serch,  showserch, setserch} = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType,setsorttpye]=useState('relevant')
  // 2. The toggle function
  const toggleCategory = (e) => {
    
    if (category.includes(e.target.value)) {
      // Remove from array
      setCategory((prev) => {
        console.log(prev, "prev remove value before update");
        return prev.filter((item) => {
          return item !== e.target.value;
        });
      });
    } else {
      // Add to array
      setCategory((prev) => {
        console.log(prev, "prev add value before update");
        return [...prev, e.target.value];
      });
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      // Remove from array
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      // Add to array
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilters = () => {
    let filtered = products.slice();
    if (showserch &&serch) {
      filtered=filtered.filter(item=>item.name.toLowerCase().includes(serch.toLowerCase()))
    }
    if (category.length > 0) {
      filtered = filtered.filter((product) =>
        category.includes(product.category),
      )
    }
    if (subCategory.length > 0) {
       filtered = filtered.filter((product)=>subCategory.includes(product.subCategory))
    }
    setFilteredProducts(filtered)
  };
const sortProduct = () => {
  let sortCopy = [...filteredProducts];

  // Match the strings exactly with your <option value="...">
  if (sortType === 'price_low_high') {
    setFilteredProducts(sortCopy.sort((a, b) => a.price - b.price));
  } 
  else if (sortType === 'price_high_low') {
    setFilteredProducts(sortCopy.sort((a, b) => b.price - a.price));
  } 
  else {
    applyFilters();
  }
};




  useEffect(() => {
    applyFilters();
  }, [category, subCategory,serch,showserch]);

  useEffect(()=>{
  sortProduct()
  },[sortType,products])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {/* Filter Options */}
<div className=" sm:min-w-[240px] md:min-w-60">
        <p
          onClick={() => setShowFilters(!showFilters)}
          className="my-2 text-lg sm:text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilters ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilters ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Product Grid with Responsive Columns and Gap */}
      <div className="flex-1">
        <div className="flex justify-between text-lg sm:text-xl md:text-2xl mb-6">
          <Title text1={"ALL"} text2={"COLLECTION"} />
          {/* Sort Dropdown - Visible on larger screens, hidden on mobile for simplicity */}
          <select onChange={(e)=>setsorttpye(e.target.value)} className="border border-gray-300 px-3 py-1 text-sm">
            <option value="relevant">Spot by : Relavent</option>
            <option value="price_low_high">Price: Low to High</option>
            <option value="price_high_low">Price: High to Low</option>
          </select>
        </div>
        {/* Product Grid with Responsive Columns and Gap */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 md:gap-6">
          {filteredProducts.map((product) => (
            <Productitem
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
