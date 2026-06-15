import React, { useEffect, useState, useCallback } from 'react' // Added useCallback
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
function Orders({ token }) {
  const [orderproduct, setorderproduct] = useState([])

  // Memoize function to prevent unnecessary re-renders
  const handleorder = useCallback(async () => {
    try {
      if (!token) return

      const response = await axios.post(
        'http://localhost:4000/api/order/allorders',
        {},
        { headers: { token } } // Most common backend pattern, or use { Authorization: `Bearer ${token}` }
      )
  console.log(response);
  
      // Fixed: changed 'responses' to 'response'
      if (response.data.success) {
        setorderproduct(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }, [token])

  const statuehendle=async(orderid,status)=>{
   try {
    const response =await axios.post('http://localhost:4000/api/order/status',{orderid,status:event.target.value},{
      headers:{token}
    })
    console.log(response);
    await handleorder();
   } catch (error) {
    console.log(error);
    toast.error(response.error.message)
    
   }
  }
  useEffect(() => {
    handleorder()
  }, [handleorder]) // Reliable dependency tracking

 return (

  <div className="p-5">
    <h2 className="text-xl font-bold mb-4">Your Orders</h2>
    {orderproduct.map((order, index) => (
      <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">
        <img src={assets.parcel_icon} className="w-12" alt="Parcel Icon" />
        
        <div>
          <div>
            {order.items.map((item, itemIndex) => {
              if (itemIndex === order.items.length - 1) {
                return <p className='py-0.5' key={itemIndex}>{item.name} x {item.quantity}</p>
              } else {
                return <p className='py-0.5' key={itemIndex}>{item.name} x {item.quantity},</p>
              }
            })}
          </div>
          {/* Accessing address details from the order object */}
          <p className='font-medium mt-3 mb-2'>{order.address.firstName + " " + order.address.lastName}</p>
          <div>
            <p>{order.address.street + ","}</p>
            <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
          </div>
          <p>{order.address.phone}</p>
        </div>

        <div>
          <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
          <p className='mt-3'>Method: {order.paymentMethod}</p>
          <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
          <p>Date: {new Date(order.date).toLocaleDateString()}</p>
        </div>

        <p className='text-sm sm:text-[15px] font-semibold'>${order.amount}</p>

        <select onChange={(event)=>statuehendle(order._id,event)} className='p-2 font-semibold border border-gray-300 outline-none' value={order.status}>
          <option value="Order Placed">Order Placed</option>
          <option value="Packing">Packing</option> 
          <option value="Shipped">Shipped</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
    ))}
  </div>
  );}

export default Orders
