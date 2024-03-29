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
  enrollment_no: {
    type: String,
    unique: true,
  },
  course: String,
});

const Student = mongoose.model("Student", studentSchema);

// Render student form
app.get("/", (req, res) => {
  res.render("student_form");
});

// Handle form submission
//create student
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
      res.status(200).json({
        success: true,
        student,
      });
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.status(500).send("Error occurred while creating student.");
    }
  } else {
    res.status(404).json({
      success: false,
      message: "Student already enrolled!",
    });
    console.log("student exits");
    res.render("alreadyExist");
  }
});

//update student credentials

app.put("/update", async (req, res) => {
  let { name, faculty_no, enrollment_no, course } = req.body;
  let exist = await Student.findOne({ enrollment_no });

  if (exist) {
    let updated = await Student.updateOne({
      name,
      faculty_no,
      course,
    });

    res.status(200).json({
      success: true,
      updated,
    });
  } else
    res.status(404).json({
      success: false,
      message: "not updated!",
    });
});

//delete student
app.delete("/delete", async (req, res) => {
  try {
    let { enrollment_no } = req.body;
    let enrolledStudent = await Student.findOne({ enrollment_no });
    if (enrolledStudent) {
      let student = await Student.deleteOne({ enrollment_no });
      res.status(201).json({
        success: true,
        message: "student removed!",
      });
    } else
      res.status(404).json({
        success: false,
        message: "student not found!",
      });
  } catch (err) {
    res.json({
      success: false,
      message: err,
    });
  }
});

/// read students

app.get("/students", async (req, res) => {
  try {
    let students = await Student.findOne({ enrollment_no: "gm6508" });
    res.status(201).json({
      success: true,
      students,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err,
    });
  }
});

// get one student
app.get("/student", async (req, res) => {
  let student = req.body;
  let enrolledStudent = await Student.findOne({
    enrollment_no: student.enrollment_no,
  });

  if (enrolledStudent)
    res.json({
      success: true,
      enrolledStudent,
    });
  else
    res.json({
      success: false,
      message: "not found!",
    });
});
// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
