import connectDB from "./config/connectDB.js";
import cloudinary from "cloudinary";
import { app } from "./app.js";

connectDB();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
