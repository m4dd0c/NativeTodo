import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../Models/User.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import mailSender from "../utils/sendMail.js";
import genOTP from "../utils/genOTP.js";
import sendToken from "../utils/setToken.js";
import cloudinary from "cloudinary";
import fs from "fs";
// sign up
export const signup = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const avatar = req.files.avatar.tempFilePath;
  console.log("data", req.files);
  if (!name || !email || !password || !avatar)
    return next(new ErrorHandler(404, "Fill all Fields"));
  const isIdeal = await User.findOne({ email });
  if (isIdeal)
    return next(new ErrorHandler(401, "Invalid Email or User already Exist"));

  const otp = genOTP();
  const message = `Your Verification Code is ${otp}\nVerify Your Account within 5 Minutes or your NativeTODO account will be eliminated`;

  const mail = await mailSender(
    email,
    "Verify Your Account - NativeTODO",
    message
  );
  if (!mail)
    return next(
      new ErrorHandler(
        500,
        "Unable to send OTP at the moment\nPlease Try again later"
      )
    );
  //cloudinary
  const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "NativeTODO",
  });
  fs.rmSync("./tmp", { recursive: true });

  const user = await User.create({
    email,
    name,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    OTP: otp,
    OTP_expiry: new Date(Date.now() + process.env.OTP_EXPIRY * 60 * 1000),
  });
  sendToken(res, user, 201, "signup successfully");
});

// login
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler(404, "Fill all Fields"));

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler(401, "Wrong Credentials"));

  const match = await user.comparePassword(password);
  if (!match) return next(new ErrorHandler(401, "Wrong Credentials"));
  sendToken(res, user, 200, "login successful");
});
// loadUser
export const loadUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.id);
  if (!user) return next(new ErrorHandler(401, "Wrong Credentials"));

  res.status(200).json({ success: true, user });
});
// editUser
export const editUser = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  let avatar = req.files || null;

  const user = await User.findById(req.id);
  if (!user) return next(new ErrorHandler(401, "Wrong Credentials"));

  if (name) user.name = name;
  if (avatar) {
    avatar = req.files.avatar.tempFilePath;
    //destroy
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    //upload
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "NativeTODO",
    });
    //destroy from fs
    fs.rmSync("./tmp", { recursive: true });
    user.avatar.public_id = myCloud.public_id;
    user.avatar.url = myCloud.secure_url;
  }
  await user.save();
  res.status(200).json({ success: true, message: "profile updated" });
});

//verify
export const verify = catchAsyncError(async (req, res, next) => {
  const { otp } = req.body;
  if (!otp) return next(new ErrorHandler(404, "Please Provide an OTP"));
  const user = await User.findById(req.id);
  if (!user) return next(new ErrorHandler(401, "Wrong Credentials"));

  if (otp !== user.OTP || user.OTP_expiry < Date.now()) {
    return next(new ErrorHandler(401, "Invalid OTP or OTP has been Expired"));
  }
  user.verified = true;
  user.OTP = null;
  user.OTP_expiry = null;
  await user.save();
  res.status(200).json({ success: true, message: "verification successful" });
});

// change password
export const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return next(new ErrorHandler(404, "Fill all Fields"));

  const user = await User.findById(req.id).select("+password");
  if (!user) return next(new ErrorHandler(401, "unauthorized user"));

  const match = await user.comparePassword(oldPassword);
  if (!match) return next(new ErrorHandler(401, "Wrong Credentials"));

  user.password = newPassword;
  await user.save();
  res.status(200).json({ success: true, message: "password changed" });
});

//forget password
export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new ErrorHandler(404, "Please Provide an Email"));

  const user = await User.findOne({ email });
  if (!user) return next(new ErrorHandler(401, "Wrong Credentials"));

  const otp = genOTP();

  const msg = `Your Reset Password OTP is ${otp}\nuse this OTP to reset your forgotten Password for one time\nNote: OTP is only valid for 5 minutes\n\nIf you have not request for Reset Password Kindly Ignore this mail and Do not share this OTP with anyone`;
  await mailSender(email, "Your Reset Password OTP - NativeOTP", msg);

  user.resetExpiry = new Date(Date.now() + process.env.OTP_EXPIRY * 60 * 1000);
  user.resetOTP = otp;
  await user.save();

  res
    .status(200)
    .json({ success: true, message: "OTP sent to your Email Account" });
});

//reset password
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { otp, password } = req.body;
  if (!otp || !password) return next(new ErrorHandler(404, "Fill all fields"));

  const user = await User.findOne({
    resetOTP: otp,
    resetExpiry: { $gt: Date.now() },
  });
  if (!user)
    return next(new ErrorHandler(401, "Invalid OTP or OTP has been Expired"));

  user.password = password;
  user.resetOTP = null;
  user.resetExpiry = null;
  await user.save();
  res.status(200).json({ success: true, message: "password changed" });
});

//delete user
export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.id);
  if (!user) return next(new ErrorHandler(401, "unauthorized user"));

  await user.deleteOne();

  res
    .status(200)
    .json({ success: true, message: "your account has been deleted" });
});
//logout user
export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: true,
      httpOnly: true,
    })
    .json({ success: true, message: "logout successful" });
});
