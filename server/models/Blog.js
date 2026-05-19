import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {type: String, requires: true},
    subTitle: {type: String},
    description: {type: String, requires: true},
    category: {type: String, requires: true},
    image: {type: String, requires: true},
    isPublished: {type: Boolean, requires: true},


} ,{timestamps: true});

const Blog = mongoose.model('blog',blogSchema);

export default Blog;