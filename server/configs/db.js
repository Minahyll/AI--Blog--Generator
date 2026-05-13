import mongoose from "mongoose";


const connectDB = async ()=>{
    // try{
   
    //     await mongoose.connect(`${process.env.MONGODB_URI}/Intelliblog`)
    //          mongoose.connection.on('connected', ()=> console.log
    //     ("Database Connected")
    // )
try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "Intelliblog",
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        })
           console.log("✅ Database Connected")

    } catch (error){
        console.log(error.message)
        process.exit(1)

    }
    
}
export default connectDB;