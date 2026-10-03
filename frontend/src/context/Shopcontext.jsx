import { createContext, useEffect, useState } from "react";
import axios from 'axios'

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const currncy = "$";
  const delvery_fee = 5.99;
  const [serch, setserch] = useState("");
  const [showserch, setshowserch] = useState(true); 
  const [cartitem, setCartitem] = useState({});
  const [products, setProduct] = useState([]);
  const [token,settoken]=useState('')

  
  
  const navigate =useNavigate()

  // 1. ADD / INCREMENT ITEM
  const addItem =async (itemId, size) => {
    if (!size) {
      toast.error("Select Sroduct Size");
      return;
    }
    // 1. Create a deep copy of the current state
    const cartData = structuredClone(cartitem);

    // 2. Initialize the item object if it doesn't exist
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // 3. Increment the size or initialize it to 1
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    // 4. Update the state
    
    if (token) {
      try {
        const response = await axios.post("http://localhost:4000/api/cart/add",{itemId,size},{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
      toast.success(response.data.message);
      
      } catch (error) {
        toast.error(error.message);
      }
      
    }
    setCartitem(cartData);
  };

  const getCartCount = () => {
    let cartCount = 0;
    for (const productId in cartitem) {
      // Loop through products
      for (const variant in cartitem[productId]) {
        // Loop through sizes/variants
        const quantity = cartitem[productId][variant];
        if (quantity > 0) {
          cartCount += quantity;
        }
      }
    }
    return cartCount;
  };

  // 2. REMOVE / DECREMENT ITEM
  const removeItem = (id) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === id);

      if (existingItem.quantity > 1) {
        // If more than 1, just decrease the quantity
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        );
      }
      // If only 1 left, remove the item entirely from the array
      return prev.filter((item) => item.id !== id);
    });
  };
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartitem) {
      // 1. Find the product details
      let itemInfo = products.find((product) => product._id === itemId);

      for (const size in cartitem[itemId]) {
        // 2. Only calculate if quantity is greater than 0 and product exists
        if (cartitem[itemId][size] > 0 && itemInfo) {
          totalAmount += itemInfo.price * cartitem[itemId][size];
        }
      }
    }
    // 3. MUST return the total
    return totalAmount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    setCartitem((prev) => {
      // 1. Clone the previous state
      let cartData = structuredClone(prev);

      // 2. Update the value
      cartData[itemId][size] = quantity;

      return cartData;
    
    });

      if (token) 
        try {
        const response = await axios.post("http://localhost:4000/api/cart/update", 
  { itemId, size, quantity }, // itemId and size are CRITICAL
  { headers: { token } }
);

          if (response.data.success) {
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
            }
        } catch (error) {
          toast.error(error.message);
        }{
        
      }

  };



  const getproduct=async()=>{
    try {
      const respons= await axios.get("http://localhost:4000/api/product/list")
      setProduct(respons.data.product)
    } catch (error) {
      toast.error(error.message)
    }
    
  }
 const getcart = async (token) => {
  try {
    const response = await axios.get("http://localhost:4000/api/cart/get", {
      headers: {
        Authorization: `Bearer ${token}` // Ensure token is passed correctly
      }
    });
    
    if (response.data.success) {
      setCartitem(response.data.cartData); // Match your backend's "cartData" key
    }
  } catch (error) {
    toast.error(error.message);
  }
};

useEffect(() => {
    getproduct()
    
  }, [cartitem]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      settoken(localStorage.getItem("token"));
      getcart(localStorage.getItem("token"))
    } else {
      getcart(token);
    }
  }, [token]);

  const value = {
    updateQuantity,
    products,
    currncy,
    delvery_fee,
    showserch,
    setshowserch,
    serch,
    setserch,
    addItem,
    cartitem,
    getCartCount,
    getCartAmount,
    navigate,
    settoken,
    token,
    setCartitem,
    
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopProvider;
