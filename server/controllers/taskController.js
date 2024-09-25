import catchAsyncError from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../Models/User.js";
import Task from "../Models/Task.js";
export const createTask = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.id);
  if (!user) return next(new ErrorHandler(401, "unauthorized to take action"));
  const { title, description } = req.body;
  if (!title || !description)
    return next(
      new ErrorHandler(
        404,
        "Please Provide Title and Description both as Mandatory"
      )
    );
  await Task.create({ title, description, userId: user._id });
  res.status(201).json({
    success: true,
    message: "task Created",
  });
});
export const loadTasks = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.id);
  if (!user) return next(new ErrorHandler(401, "unauthorized to take action"));
  const tasks = await Task.find({ userId: user._id });
  if (!tasks)
    return next(new ErrorHandler(404, "No Task found\nCreate One to See"));
  res.status(200).json({ success: true, tasks });
});
export const editTask = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.id);
  if (!user) return next(new ErrorHandler(401, "unauthorized to take action"));
  const { title, description } = req.body;
  if (!title || !description)
    return next(
      new ErrorHandler(
        404,
        "Please Provide Title and Description both as Mandatory"
      )
    );
  const taskId = req.params.id;
  const task = await Task.findOne({ _id: taskId, userId: req.id });
  if (!task) return next(new ErrorHandler(404, "No task found to Edit"));
  task.title = title;
  task.description = description;
  await task.save();
  res.status(200).json({
    success: true,
    message: "task updated",
  });
});
export const deleteTask = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.id);
  if (!user) return next(new ErrorHandler(401, "unauthorized to take action"));
  const taskId = req.params.id;
  const task = await Task.findOne({ _id: taskId, userId: req.id });
  if (!task) return next(new ErrorHandler(404, "Task not found to Delete"));
  await task.deleteOne();
  res.status(200).json({
    success: true,
    message: "task deleted",
  });
});
export const singleTask = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.id);
  if (!user) return next(new ErrorHandler(401, "unauthorized to take action"));
  const taskId = req.params.id;
  const task = await Task.findOne({ _id: taskId, userId: req.id });
  if (!task) return next(new ErrorHandler(404, "Task not found to Delete"));
  res.status(200).json({
    success: true,
    task,
  });
});
