import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/Shopcontext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token, setCartitem } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const success = searchParams.get("success");
    const order_id = searchParams.get("order_id");

    if (!token) {
      toast.error("Please login to verify payment");
      navigate("/login");
      return;
    }

    if (success === "true" && order_id) {
      // Call verify API
      axios.post("/api/order/verify", 
        { order_id, success: true },
        { headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
         } }

      ).then(res => {
        if (res.data.success) {
          setCartitem({});
          setMessage("Payment Successful! Order confirmed.");
          toast.success("Payment Successful!");
          setTimeout(() => navigate("/orders"), 2000);
        } else {
          setMessage("Payment verification failed.");
          toast.error(res.data.message);
        }
      }).catch(err => {
        setMessage("Verification error.");
        toast.error(err.response?.data?.message || err.message);
      }).finally(() => setLoading(false));
    } else {
      setMessage("Payment cancelled or failed.");
      toast.error("Payment not completed.");
      setTimeout(() => navigate("/orders"), 2000);
      setLoading(false);
    }
  }, [searchParams, token, navigate, setCartitem]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {loading ? (
          <div>
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-medium text-gray-700">Verifying payment...</p>
          </div>
        ) : (
          <>
            {message.includes("Successful") ? (
              <div>
                <img src={assets.stripe_logo} alt="Stripe" className="w-20 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-600 mb-2">✓ Success!</h2>
              </div>
            ) : (
              <div>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h2>
              </div>
            )}
            <p className="text-gray-600 mb-6">{message}</p>
            <button 
              onClick={() => navigate("/orders")}
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
            >
              View Orders
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Verify;

