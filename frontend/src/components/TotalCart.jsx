import React, { useContext, useEffect, useState } from 'react' // Removed useState
import { ShopContext } from '../context/Shopcontext'
import { useLocation } from 'react-router-dom';

function TotalCart() {
  const {  getCartAmount, currncy, delvery_fee,navigate } = useContext(ShopContext);
  const [loction,setloction ]=useState(true)
  // Get the actual amount from context
  const subtotal =  getCartAmount(); 
  const location = useLocation();
  // Calculate total: if subtotal is 0, total is 0, otherwise add delivery
  const totalAmount = subtotal === 0 ? 0 : subtotal + delvery_fee;
  useEffect(()=>{
    if (location.pathname==='/place-order') {
      setloction(false)
    }
  },[loction])

  return (
    <div className=' '>
        <div className="lg:w-80">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-10">
            <h3 className="text-xl font-bold text-gray-900 mb-6">TOTALS</h3>

            <div className="space-y-3 border-b pb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{currncy}{subtotal}.00</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Shipping Fee</span>
                <span>
                  {/* Show 0 if cart is empty, else show delivery fee */}
                  {subtotal === 0 ? `${currncy}0.00` : `${currncy}${delvery_fee}.00`}
                </span>
              </div>
            </div>

            <div className="flex justify-between py-4 text-xl font-extrabold text-gray-900">
              <span>Total</span>
              <span>{currncy}{totalAmount}.00</span>
            </div>

          {
            loction &&
            <button
            disabled={subtotal === 0}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-transform active:scale-95 mt-4 ${
              subtotal === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
            onClick={()=>navigate('/place-order')}
          >
            Checkout Now
          </button>}
          </div>
        </div>
    </div>
  )
}

export default TotalCart;
