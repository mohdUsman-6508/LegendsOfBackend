// /////// let's make a server////////
// //if you want to use import and export , change type to module in package.json
// // ***************************************
// // const http = require("http");
// // const greet = require("./aModule");
// // const goodbye = require("./aModule");
// // ***************************************
// // // a way of importing
// // console.log(http);

// //another way of importing

// // import http from "http";
// // import greet from "./aModule.js";
// // import { sayHello, goodbye } from "./aModule.js";
// // import fs from "fs"; //file reading ke kaam aata he
// // import path from "path";

// // fs.readFile("./index.htm", () => {
// //   console.log("file read");
// // }); //asyn task

// // console.log(path.extname("a.js"));
// // const home = fs.readFileSync("./index.htm");

// // const server = http.createServer((req, res) => {
// //   console.log(req.method);
// //   if (req.url === "/home") res.end(home);
// //   else if (req.url === "/about") res.end("About");
// //   else res.end(`<h1>${goodbye()}</h1>`);
// // });

// // server.listen(3000, () => {
// //   console.log("server is running...");
// // });

// // console.log(greet());
// // console.log(goodbye());
// // console.log("hello");
// ///
// import express from "express";
// import path from "path";
// const app = express();

// app.get("/", (req, res) => {
//   // res.send("Hi,Welcome");
//   // res.sendStatus(400);
//   const pathLocation = path.resolve();
//   res.sendFile(path.join(pathLocation, "./index.htm"));
//   // res.json({
//   //   success: true,
//   //   confidence: true,
//   //   rank: [1, 1, 1],
//   // });
// });

// app.listen(5000, () => {
//   console.log("Listening at port 5000");
// });

import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const app = express();

// var user = [
//   { name: "adam", email: "adam@mail.com", message: "Hello" },
//   { name: "newton", email: "newton@mail.com", message: "marhaba" },
// ];
//static

///connect mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/", { dbName: "users" })
  .then(() => {
    console.log("connected!");
  })
  .catch((err) => {
    console.log(err);
  });

/// make schema and model

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, require: true },
  password: { type: String, require: true },
});

const User = new mongoose.model("user", userSchema);

//using middlewares
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//setting up view engine
app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   // res.send("hello");
//   //can insert data in html file 'dynamically'
//   // res.sendFile("ind");
//   res.render("index", { author: "Shakespeare" });
// });

// app.get("/users", (req, res) => {
//   res.json(user);
// });

// app.get("/success", (req, res) => {
//   res.render("success");
// });

// app.post("/contact", async (req, res) => {
//   console.log(req.body.email);
//   let userRegister = {
//     name: req.body.name,
//     email: req.body.email,
//     message: req.body.message,
//   };

//   await User.create(userRegister);
//   user.push(userRegister);
//   res.render("success");
// });

/////// *************************/////////////////
////// Authentication ,cookies, schema, post,get etc.
///jwt , cookie parser, etc

//////////////****************//////////////// */
//simple isAuthenticated middleware (custom)
// next ka kamaal

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(token, "secretsabc");
    req.user = await User.findById(decoded._id);
    next();
  } else {
    res.render("login");
  }
};

///
// app.get("/lgn", (req, res) => {
//   console.log(req.cookies.token);
//   if (req.cookies.token) {
//     res.render("logout");
//   } else res.render("login");
// });
app.get("/", isAuthenticated, (req, res) => {
  console.log(req.user);
  res.render("logout", { name: req.user.name });
}); /// jab authenticated me next call hoga tab he logout render hoga

///
app.post("/login", async (req, res) => {
  //setting cookie
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    console.log("account does not exist!");
    return res.redirect("/register/form");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.render("login", { message: "Incorrect Password" });

  // user = await User.create({ name, email, password });

  const token = jwt.sign({ _id: user._id }, "secretsabc"); /// token bana rahe he security purpose ke liye
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 120 * 1000),
  });
  res.redirect("/");
});

///
app.get("/register/form", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.redirect("/");
  }
  const hashedPassword = await bcrypt.hash(password, 10); ///// password ko hash karke store kara rahe he jo jaruri honda si
  await User.create({ name, email, password: hashedPassword });
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

app.listen(5000, () => {
  console.log("Server is Listening at 5000");
});
