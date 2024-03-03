import userRouter from "./routes/user.js";
import express from "express";

export const app = express();

// config({
//   path: "../data/config.env",
// });

//using middlewares
app.use(express.json());
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Working");
});
