import React from 'react'
import Hero from './components/ListingPage/Hero'
import Highlights from './components/ListingPage/Highlights'
import Working from './components/ListingPage/Working'

const ListingPage = () => {
  return (
    <div className=''>
        <Hero/>
        <Highlights/>
        <Working/>
    </div>
  )
}

export default ListingPage