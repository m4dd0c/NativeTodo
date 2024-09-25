import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
const userSchema = new mongoose.Schema({
  name: {
    required: true,
    minlength: [3, "Name must be larger than 3 characters"],
    maxlength: [15, "Name must not exceed 15 characters"],
    type: String,
  },
  email: {
    unique: true,
    required: true,
    type: String,
    validate: [validator.isEmail, "Invalid Email"],
  },
  password: {
    required: true,
    minlength: [8, "Password must contain atleas 8 characters"],
    maxlength: [20, "Password must not exceed 20 characters"],
    type: String,
    select: false,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },

  OTP: {
    type: Number,
    default: null,
  },
  OTP_expiry: {
    type: Date,
    default: null,
  },
  resetOTP: {
    type: Number,
    default: null,
  },
  resetExpiry: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
  } else {
    next();
  }
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET_EXPIRY,
  });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//deletes the whole document after 0 second as OTP get expired
userSchema.index({ OTP_expiry: 1 }, { expireAfterSeconds: 0 });

const User = mongoose.model("User", userSchema);
export default User;
