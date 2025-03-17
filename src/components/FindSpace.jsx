import React from 'react'
import SpaceHero from '../components/FindSpacePage/SpaceHero'
import SpaceFilter from '../components/FindSpacePage/SpaceFilter'


const FindSpace = () => {
  return (
    <div className='min-h-screen'>
    <SpaceHero/>
    <SpaceFilter/>

    </div>
  )
}

export default FindSpace