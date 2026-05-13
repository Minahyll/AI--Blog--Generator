import fs from 'fs'
import imagekit from '../configs/imagekit.js';
import Blog from'../models/Blog.js';

export const addBlog = async(req, res)=>{
    try{
        const {title, subTitle, description, category, isPublished}
        =JSON.parse(req.body.blog);
        const imageFile = req.file;

        // Chech if all fields are present
        if(title || !description || !category || !imageFile){
            return res.json({success: false, message: "Missing required fields"})

        }
        const fileBuffer = fs.readFileSync(imagekit.path)

        // upload Image to Imagekit
    const response = await imagekit.upload({
        file: fileBuffer,
         fileName: imageFile.originalname,
         folder: "/blogs"   
        })
        // optimization through imagekit URL transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filepath,
            transformation: [
                // {quality: 'auto'}, Auto compression
                // {format: 'webp'}, convert to modern format
                // {width: '1280'} width resizing
            ]
        });
        const image = optimizedImageUrl;
        await blog.create({title, subtitle, description, category, image, isPublished})
       res.json ({success: true, message:"Blog added successfully"}) 
    }catch(error ) {

    }
}