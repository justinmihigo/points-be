import { config } from "dotenv";
import mongoose from "mongoose";
config();
const MONGO_URI= process.env.MONGO_URI || ""
console.log(MONGO_URI);

const dbConnection=async ()=>{
    try {
        const connect = (await mongoose.connect(MONGO_URI)).Connection;
        if(connect){
            console.log("Connected to MongoDB");
        }
        else{
            throw new Error("Could not connect to MongoDB");
        }
    } catch (error) {
        console.log('error',error);
    }
}

export default dbConnection;