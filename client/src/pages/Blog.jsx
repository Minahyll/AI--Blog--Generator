import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data } from '../assets/assets'
import Moment from 'moment'
const Blog = () => {
  const {id} = useParams()
  const [data, setdata] = useState(null)
  const fetchBlogData = async ()=>{
   const data = blog_data.find(item => item._id == id)
   setdata(data)
  }
  useEffect (() => {
fetchBlogData()
  },[])
  return  data ? (
    <div className='relative'> 
    <img src={assets.gradientBackground} alt=""  className='absolute -top-50 -z-1
    opacity-50'/>
      

    <div>
      <p>Published on {Moment(data.createdAt).format('MMMM Do YYYY')} </p>
    </div>
    <div></div>
    </div>
  ) : <div>Loding...</div>
}

export default Blog
