import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    //  <img src={assets.gradientBackground} alt=""
    //     className='absolute -top-10  left-0 -z-10 opacity-50' />
  return (
    <div  className='mx-8 sm:mx-16 xl:mx-24 relative'>

      <img src={assets.gradientBackground} alt=""
        className='absolute -top-10  left-0 -z-10 opacity-50'/>

        <div className='text-center mt-20 mb-8'>

        <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5
         mb-4 border border-blue-400 bg-blue-100 rounded-full text-sm 
         text-blue-500'>
            <p>New: AI Feature Integrated</p>
            <img src={assets.star_icon} className='w-2.5' alt=""/>
         </div>
    

        </div>
       
    </div>
  )
}

export default Header
