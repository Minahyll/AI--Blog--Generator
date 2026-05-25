import express from 'express'
import mongoose from 'mongoose';
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import blogRouter from './routes/blogRoutes.js';
import adminRouter from './routes/adminRoutes.js';

const app = express();
await connectDB()

//Middlewares
app.use(cors()) 
app.use(express.json())
// Add this BEFORE routes
app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.url}`);
    next();
});
//Routes
app.get('/', (req,res) => 
     res.send("API is Working"))
app.use('/api/admin', adminRouter);
app.use('/api/blog',blogRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
export default app;