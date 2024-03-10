import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();

// Setting view engine to EJS
app.set("view engine", "ejs");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/student", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected..");
  })
  .catch((err) => {
    console.log(err);
  });

// Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  faculty_no: String,
  enrollment_no: String,
  course: String,
});

const Student = mongoose.model("Student", studentSchema);

// Render student form
app.get("/", (req, res) => {
  res.render("student_form");
});

// Handle form submission
app.post("/new", async (req, res) => {
  let { name, faculty_no, enrollment_no, course } = req.body;

  let enrolledStudent = await Student.findOne({ enrollment_no });
  if (!enrolledStudent) {
    try {
      const student = await Student.create({
        name,
        faculty_no,
        enrollment_no,
        course,
      });
      console.log(student);
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.status(500).send("Error occurred while creating student.");
    }
  } else {
    console.log("student exits");
    res.render("alreadyExist");
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
