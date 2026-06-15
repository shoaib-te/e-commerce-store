import React from 'react'
import { assets, products } from '../assets/assets'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import LatestCollection from '../components/latestCollection'
import Bastseller from '../components/Bastseller'
import OverPolicy from '../components/OverPolicy'
import Newslitterbox from '../components/Newslitterbox'
function Home() {
  

  return (
    <div>
     <Hero />
      <Bastseller />
     <LatestCollection />
    
     <OverPolicy />
     <Newslitterbox />
    </div>
  )
}

export default Home
