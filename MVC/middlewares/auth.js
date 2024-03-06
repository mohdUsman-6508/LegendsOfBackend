import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(process.env.JWT_SECRET);
    if (!token) {
      res.status(404).json({
        success: false,
        message: "Login First!",
      });
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        console.log("heheheh");
        if (err) {
          console.log(err);
          return res.status(403).send("Could  not verify token");
        }
        console.log("ho gaya");
        const user = await User.findById(user._id);
        return res.status(200).json({
          success: true,
          user,
        });
      });
    }
  } catch (error) {
    console.log("error agya bhai");
  }
};
