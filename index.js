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
const app = express();

var user = [
  { name: "adam", email: "adam@mail.com", message: "Hello" },
  { name: "newton", email: "newton@mail.com", message: "marhaba" },
];
//static

//using middlewares
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));

//setting up view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.send("hello");
  //can insert data in html file 'dynamically'
  // res.sendFile("ind");
  res.render("index", { author: "Shakespeare" });
});

app.get("/users", (req, res) => {
  res.json(user);
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.post("/contact", (req, res) => {
  console.log(req.body.email);
  let userRegister = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  };
  user.push(userRegister);
  res.render("success");
});

app.listen(5000, () => {
  console.log("Server is Listening at 5000");
});

console.log(user);
