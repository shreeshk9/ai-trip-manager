import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[50px] text-center mt-16'>
        <span className='text-[#f56521]'> Discover Your Next Adventure with AI:</span> <span>Personalized Itineraries at Your Fingertips</span>
      </h1>
      <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budgets</p>
      <Link to={'/create-trip'} className='flex justify-center'>
        <Button>Get Started, it's free</Button>
      </Link>
      <img src="/landingpage.jpg" className='-mt-20'/>
    </div>
  )
}

export default Hero
