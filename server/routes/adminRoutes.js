import express from "express";
import { adminLogin, approvedCommentsById, deleteCommentsById, getAllBlogsAdmin, getAllComments, getDashboard } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login",adminLogin);
adminRouter.get("/comments",auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentsById)
adminRouter.post("/approved-comment", auth, approvedCommentsById);
adminRouter.get("/dasboard", auth, getDashboard);



export default adminRouter