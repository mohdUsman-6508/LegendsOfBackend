import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  console.log(process.env.JWT_SECRET);
  console.log(user);
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    algorithm: "none",
  });
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
    })
    .json({
      success: true,
      message,
    });
};
