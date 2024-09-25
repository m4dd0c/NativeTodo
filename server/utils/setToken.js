const sendToken = (res, user, statusCode, message) => {
  const token = user.getJWTToken();
  const userInfo = {
    id: user._id,
    name: user.name,
    email: user.email,
    verified: user.verified,
  };
  const cookieOptions = {
    expire: new Date(
      new Date() + process.env.COOIKE_EXPIRE_DAYS * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  return res
    .status(Number(statusCode))
    .cookie("token", token, cookieOptions)
    .json({ success: true, message, userInfo });
};

export default sendToken;
