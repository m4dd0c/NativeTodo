import express from "express";
import isAuth from "../middleware/authMiddleware.js";
import {
  changePassword,
  deleteUser,
  editUser,
  forgetPassword,
  loadUser,
  login,
  resetPassword,
  signup,
  verify,
  logout
} from "../controllers/userController.js";
const router = express.Router();

router
  .route("/me")
  .get(isAuth, loadUser)
  .put(isAuth, editUser)
  .delete(isAuth, deleteUser);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/password/change").put(isAuth, changePassword);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset").put(resetPassword);

router.route("/verify").put(isAuth, verify);

export default router;
