import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config()

const connectToDatabase = async (url?: string): Promise<void> => {
    try {
        const url = process.env.MONGODB_URL
        if (url === undefined) {
            console.log("url is undefined")
            return
        }
        const connection = await mongoose.connect(url)
        console.log("Successfully connect to database")
    } catch (error) {
        console.log("Error while connect to database")
        process.exit(1)
    }
}
// connectToDatabase()
export default connectToDatabase
