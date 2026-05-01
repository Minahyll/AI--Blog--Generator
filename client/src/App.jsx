import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Navbar from './components/Navbar'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
         <Route path='/' element={<Home/>}/>               
         <Route path='/blog' element={<Blog/>}/>               
          {/* <Route path='/admin'element={<h1>Admin Page</h1>}></Route> */}
        
      </Routes>
    </div>
  )
}

export default App
