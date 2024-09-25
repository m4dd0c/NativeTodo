import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: [3, "Title must contain atleast 3 letter"],
    maxlength: [50, "Title must not exceed 50 letter"],
    required: true,
  },
  description: {
    type: String,
    maxlength: [1000, "Description must not exceed 1000 letter"],
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    rel: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Task = mongoose.model("Task", taskSchema);
export default Task;