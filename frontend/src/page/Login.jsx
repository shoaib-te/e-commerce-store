import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/Shopcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();
  const { settoken, token,} = useContext(ShopContext);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // 1. Correct the endpoint logic: isLogin ? login : register
  const endpoint = isLogin ? "/api/user/login" : "/api/user/register";
  
  try {
    const response = await axios.post(`http://localhost:4000${endpoint}`, formData);
    
    if (response.data.success) {
      settoken(response.data.token);
      localStorage.setItem("token", response.data.token);
       // 2. Show dynamic success message
      toast.success(isLogin ? "Login successful!" : "Account created!");
      navigate("/");
    } else {
      // 3. Handle cases where success is false (e.g., wrong password)
      toast.error(response.data.message);
    }
    
    
  } catch (error) {
    // 4. Extract actual error message from server if it exists
    const errorMsg = error.response?.data?.message || error.message;
    toast.error(errorMsg);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-500 mt-2">
            {isLogin
              ? "Please enter your details to sign in"
              : "Join us by creating a new account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="John Doe"
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition-colors duration-300"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:underline font-medium"

          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
