import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/Shopcontext";
import axios from "axios";

function Orders() {
  // Extracting products and currency from your ShopContext
  const { token, currncy } = useContext(ShopContext);
  const [orderproduct, setorderproduct] = useState([]);
const handleorder = async () => {
  try {
    if (!token) return null;

    const response = await axios.post(
      "http://localhost:4000/api/order/user/orders",
      {},
      { headers: { token } }
    );

    if (response.data.success) {
      let allOrdersItem = [];

      // Flattening the nested order data
      response.data.orders.forEach((order) => {
        order.items.forEach((item) => {
          // Attach order-level info (status, date, etc.) to each individual item
          item["status"] = order.status;
          item["payment"] = order.payment;
          item["paymentMethod"] = order.paymentMethod;
          item["date"] = order.date;
          allOrdersItem.push(item);
        });
      });

      // Update state to trigger re-render
      setorderproduct(allOrdersItem.reverse()); 
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    handleorder();
  }, [token]);

  return (
    <div className="border-t pt-16 m-8">
      <div className="text-2xl">
        {/* Using your Title component for a consistent header */}
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {/* Mapping through a slice of products to simulate previous orders */}
        {orderproduct.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                className="w-16 sm:w-20"
                src={item.image[0]}
                alt={item.name}
              />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">
                    {currncy}
                    {item.price}
                  </p>
                  <p>{item.quantity}</p>
                  <p>{item.size}</p>
                </div>
                <p className="mt-2">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(item.createdAt).toDateString()}
                  </span>
                </p>
                <p className="mt-2">
                  pamyent:
                  <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                {/* Visual indicator for order status */}
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button className="border px-4 py-2 text-sm font-medium rounded-sm">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
