import mongoose from "mongoose";
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected")
    } catch (error) {
        console.log(process.env.MONGODB_URL);
        console.log("DB error")
        console.log(error)
    }
    
}
export default connectDb