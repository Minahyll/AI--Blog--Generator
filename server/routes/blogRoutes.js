import express from "express";
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComment, togglePublished } from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add",upload.single('image'),auth, addBlog)
blogRouter.get('/all',getAllBlogs);
blogRouter.post('/add-comment',addComment);
blogRouter.post('/comments',getBlogComment);
blogRouter.post('/delete',auth, deleteBlogById);
blogRouter.post('/toggle-published', auth, togglePublished);
blogRouter.post('/generate', auth, generateContent);
blogRouter.get('/:id', getBlogById);


export default blogRouter;