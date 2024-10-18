import mongoose from 'mongoose';
// import dotenv from "dotenv";

// dotenv.config();

export const connectDb = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB: ${db.connection.host}`);
    }
    catch (error){
        console.error(`Error: ${error.message}`);
        process.exit(1); // 1: fail ; 0:success
    }
}