import React from 'react'

const Loader = () => {
  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center bg-white'>
        <div className='animate-spin rounded-full h-16 w-16 border-4
        border-t-white border-gray-700'></div>
      
    </div>
  )
}

export default Loader
