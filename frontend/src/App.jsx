import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import About from './page/About'
import Collection from './page/Collection'
import Contact from './page/Contact'
import Login from './page/Login'
import Product from './page/Product'
import Cart from './page/Cart'
import Orders from './page/Orders'
import PlaceOuder from './page/PlaceOuder'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/Serchbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShopContext } from './context/Shopcontext'
import Verify from './page/Verify'

function App() {
  const {token}=useContext(ShopContext)
  return (
    <div className='min-h-screen px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        theme="light"
        style={{ fontSize: '14px' }} // Mobile-friendly toast
      />
      <Navbar />
      <SearchBar/>
      <Routes>
        
        <Route  path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/contact' element={<Contact />} />
        {
          token?<Route path='/' element={<Home />} /> :<Route path='/login' element={<Login />} />
        }
        
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/place-order' element={<PlaceOuder />} />
        <Route path='/product/:productid' element={<Product />} />
        <Route path='*' element={<Home />} />
        <Route path='/verify' element={<Verify />} />
    
      </Routes>
      <Footer />
    </div>
  )
}

export default App
