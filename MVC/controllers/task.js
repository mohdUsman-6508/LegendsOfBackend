import Task from "../models/task.js";

const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({ title, description, user: req.user });

    res.status(201).json({
      success: true,
      message: "Task created!",
    });
  } catch (error) {
    next(error);
  }
};

const getMyTask = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const tasks = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Invalid id",
      });
    }
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "updated!",
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      // return res.status(404).json({
      //   success: false,
      //   message: "Invalid id",
      // });
      return next(new Error("Invalid id!"));
    }
    await Task.deleteById(id);

    res.status(200).json({
      success: true,
      message: "deleted!",
    });
  } catch (error) {
    next(error);
  }
};

export { newTask, getMyTask, updateTask, deleteTask };
