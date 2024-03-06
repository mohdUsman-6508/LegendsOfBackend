import express from "express";
import {
  login,
  logout,
  getUserDetails,
  register,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

///is file me sare routes rahenge user ke
/// app ki jagah router isliye use kiya taki ham prefix use kar paye route me
/// isme har ek routes se pehle /users lag jayega app.js file me dekho
const router = express.Router();

// router.get("/all", getUsers);
// router.get("/userid/:id", getUser);
// router.post("/new", createUser);

/////////////////////////////////////
///////todo todo todo todo /////////
///////////////////////////////////

router.post("/register", register);
router.route("/login").post(login).get(isAuthenticated, getUserDetails);
router.get("/logout", logout);

export default router;
