import mongoose from "mongoose";
import {DB_NAME} from "./dbname.database.js"

export const connectDB = async()=>{
    try {
        const coonectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Mongodb connection Successfully with Host : ${coonectionInstance.connection.host}`)
    } catch (error) {
        console.log(`Error faced to connect DataBase : ${error.message}`)
        process.exit(1)
    }
}