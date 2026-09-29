import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Orders from './pages/Orders'
import List from './pages/list'
import Add from './pages/Add'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
 const [token, setToken] = useState(localStorage.getItem('token') || '');

useEffect(() => {
  // Only update localStorage if token has a value
  if (token) {
    localStorage.setItem('token', token);
  }
}, [token]); // This runs whenever 'token' changes

  
  return (
    <div className='bg-gray-50 min-h-screen'>
      {
        token===""?<Login setToken={setToken}/>:
        <>
       <Navbar setToken={setToken} />
        
         
       
      <div className='flex w-full'>
        {/* Sidebar usually takes a fixed width */}
      <Sidebar />
      
        
        
        {/* Main Content Area */}
        
        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
          <ToastContainer />
          {/* Routes will go here later */}
          <Routes>
            <Route path='/add' element={<Add  token={token} />} />
            <Route path='/list' element={<List token={token}/>} />
            <Route path='/orders' element={<Orders token={token} />} />
            
          </Routes>
        </div>
      </div>
      </>
      }
     
    </div>
  )
}

export default App
