import fs from 'fs'
import imagekit from '../configs/imagekit.js';
import Blog from'../models/Blog.js';

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