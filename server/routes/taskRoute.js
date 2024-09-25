import express from "express";
import isAuth from "../middleware/authMiddleware.js";
import {
  createTask,
  deleteTask,
  editTask,
  loadTasks,
  singleTask
} from "../controllers/taskController.js";
const router = express.Router();

router.route("/").post(isAuth, createTask).get(isAuth, loadTasks);

router.route("/:id").get(isAuth, singleTask).put(isAuth, editTask).delete(isAuth, deleteTask);
export default router;
