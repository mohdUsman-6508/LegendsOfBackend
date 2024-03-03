import User from "../models/user.js";

/// is folder me sare functions jo api me use ho rahe he

const getUsers = async (req, res) => {
  const users = await User.find({});

  const keyword = req.query.keyword;
  res.json({
    success: true,
    users,
  });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.json({
    success: true,
    user,
  });
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });

  res.json({
    success: true,
    message: "Registered",
  });
};

export { getUser, getUsers, createUser };
