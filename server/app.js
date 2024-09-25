import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import error from "./middleware/error.js";
import { config } from "dotenv";
config({ path: "./config/.env" });

export const app = express();

const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp",
    limits: { fileSize: 50 * 1024 * 1024 }, //50mb
  })
);
app.use(cookieParser());

//routes
import taskRoute from "./routes/taskRoute.js";
import userRoute from "./routes/userRoute.js";

app.use("/api/v1/user", userRoute);
app.use("/api/v1/task", taskRoute);
app.get("/", (req, res) => {
  console.log("hiihi");
  res.send("working server");
});

//error middleware
app.use(error);
