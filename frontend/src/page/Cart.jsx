import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shopcontext";
import Title from "../components/Title";
import TotalCart from "../components/TotalCart";
import { assets } from "../assets/assets";

function Cart() {
  const { products, currncy, cartitem, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartitem) {
      for (const item in cartitem[items]) {
        if (cartitem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartitem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartitem]);

  return (
    <div className="bg-gray-50 min-h-screen pt-10 pb-20 px-4 sm:px-[5vw]  md:px-[7vw] lg:px-[9vw]">
      <div className="mb-8">
        <Title text1={"SHOPPING"} text2={"CART"} />
      </div>

      <div className="flex flex-col r lg:flex-row gap-12">
        {/* --- Product List --- */}
        <div className="flex-1 space-y-4">
          {cartData.map((item, index) => {
            const productData = products.find((p) => p._id === item._id);
            if (!productData) return null;

            return (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 border border-gray-100"
              >
                <img
                  className="w-20 h-20 object-cover rounded-lg"
                  src={productData.image[0]}
                  alt=""
                />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-900 font-semibold text-base leading-tight">
                        {productData.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Size: <span className="font-medium text-gray-700">{item.size}</span>
                      </p>
                    </div>
                    {/* Fixed Bin Icon Placement */}
                    <img 
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      src={assets.bin_icon} 
                      className="w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity" 
                      alt="delete" 
                    />
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <p className="text-lg font-bold text-gray-900">
                      {currncy}{productData.price}
                    </p>
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                      <input
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "" || Number(val) > 0) {
                            updateQuantity(item._id, item.size, val === "" ? 0 : Number(val));
                          }
                        }}
                        className="border-none outline-none w-12 sm:w-16 px-2 py-1 bg-transparent text-center"
                        type="number"
                        min={1}
                        value={item.quantity}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Total Summary Section --- */}
       
      </div>
      {/* --- Change your bottom section to this --- */}
<div className="flex justify-end my-20">
  <div className="w-full sm:w-[450px]">
    <TotalCart />
   
  </div>
</div>

    </div>
  );
}

export default Cart;
