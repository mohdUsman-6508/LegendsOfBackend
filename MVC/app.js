import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import express from "express";
import dotenv from "dotenv";
export const app = express();
dotenv.config({ path: "./data/config.env" });

// config({
//   path: "../data/config.env",
// });

//using middlewares
app.use(express.json());
app.use(cookieParser());

// app.use("/users", userRouter);

//using routes
app.use("/api/v1/users", userRouter);
app.use("/api/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Working");
  console.log(process.env.JWT_SECRET);
});

app.use((err, req, res, next) => {
  return res.status(404).json({
    success: false,
    message: err.message,
  });
});
