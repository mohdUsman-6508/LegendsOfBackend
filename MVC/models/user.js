import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, require: true },
  password: String,
});

const User = new mongoose.model("user", userSchema);

export default User;
