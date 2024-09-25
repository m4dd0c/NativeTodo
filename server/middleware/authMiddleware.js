import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new ErrorHandler(401, "unauthorized user"));

  const isIdealUser = jwt.verify(token, process.env.JWT_SECRET);
  if (!isIdealUser) return next(new ErrorHandler(401, "unauthorized user"));
  req.id = isIdealUser.id;
  next();
};
export default authMiddleware;
