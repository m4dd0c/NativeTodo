import mongoose from "mongoose";
import catchAsyncError from "../utils/catchAsyncError.js";
const connectDB = catchAsyncError(async () => {
  await mongoose.connect(process.env.MONGO_URI, { dbName: "nativeTodo" });
  console.log("connected to Database");
});
export default connectDB;
