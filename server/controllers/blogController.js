import fs from 'fs'
import imagekit from '../configs/imagekit.js';
import Blog from'../models/Blog.js';
import Comment from '../models/Comment.js';

export const addBlog = async(req, res)=>{
      console.log("BODY:", req.body)
    console.log("FILE:", req.file)
    try{
        const {title, subTitle, description, category, isPublished}
        =JSON.parse(req.body.blog);
        const imageFile = req.file;

        // Chech if all fields are present
        if(!title || !description || !category || !imageFile){
            return res.json({success: false, message: "Missing required fields"})

        }
        const fileBuffer = fs.readFileSync(imageFile.path)

        // upload Image to Imagekit
    const response = await imagekit.upload({
        file: fileBuffer,
         fileName: imageFile.originalname,
         folder: "/blogs"   
        })
        // optimization through imagekit URL transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                // {quality: 'auto'}, Auto compression
                // {format: 'webp'}, convert to modern format
                // {width: '1280'} width resizing
            ]
        });
        const image = optimizedImageUrl;
        await Blog.create({title, subTitle, description, category, image, isPublished})
      return res.json ({success: true, message:"Blog added successfully"}) 
    }catch (error ) { 
        console.log(error)
       return res.json({success: false, message: error.message})

    }
}

export const getAllBlogs = async (req, res)=>{
    try{
        const blogs = await Blog.find({isPublished: true})
        res.json({success: true,blogs})
    }  catch (error){
        res.json({success: false, message: error.message})

    }
}

export const getBlogById = async (req, res) =>{
    try{
        const {id} = req.params;
        const blog= await Blog.findById(id)
        if(!blog){
          return res.json({success: false, message: "Blog not found"})
        }
         res.json({success: true,blog})
    } catch (error){
        res.json({success: false, message: error.message})

    }
}

export const deleteBlogById = async (req, res) =>{
    try{
        const { id} = req.body;
        await Blog.findByIdAndDelete(id);

        // Delete all comments associated with the blog
        await Comment.deleteMany({blog: id});

            res.json({success: true, message: 'Blog deleted Successfully' })
    } catch (error){
        res.json({success: false, message: error.message})

    }
}

export const togglePublished = async (req, res) =>{
    try{
        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true, message: 'Blog status updated'})
        } catch(error){
             res.json({success: false, message: error.message})

        }
}

  export const addComment = async(req,res)=>{
    try{
        const {bog, nam, content} = req.body;
        await Comment.create({blog,name,content});
        res.json({success: true, message: 'Comment added for review'})
    }catch (error){
        res.json({success: false, message: ErrorEvent.message})
    }
  }
  
  export const getBlogComment = async(req,res)=>{
    try{
        const {blogId} = req.body;
        const comments= await Comment.diffIndexes({blog: blogId, isApproved: true})
        ({createdAt: -1});
        res.json({success: true, comments})

    } catch(error){
         res.json({success: false, message: error.message})
    }
}
  
    
