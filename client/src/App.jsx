import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Navbar from './components/Navbar'
import Dashboard from './pages/admin/Dashboard'
import Layout from './pages/admin/Layout'
import AddBlog from './pages/admin/AddBlog'
import Listblog from './pages/admin/Listblog'
import Comment from './pages/admin/Comment'
import Login from './components/Admin/Login'

const App = () => {
  return ( 
    
    <div> 
      <Routes>
         <Route path='/' element={<Home/>}/>               
         <Route path='/blog/:id' element={<Blog/>}/> 
         <Route path='/admin' element={ true ?<Layout/>:<Login/>}>
         <Route index element={<Dashboard/>}/>
         <Route path='addblog' element={<AddBlog/>}/>
         <Route path='listblog' element={<Listblog/>}/>
          <Route path='comments' element={<Comment/>}/>
          {/* <Route path='/admin'element={<h1>Admin Page</h1>}></Route> */} 
          </Route>
      </Routes>
    </div>
  )
}

export default App
