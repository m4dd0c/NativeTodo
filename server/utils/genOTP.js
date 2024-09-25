const genOTP = () => {
  return Math.trunc(Math.random() * 1000000);
};

export default genOTP;