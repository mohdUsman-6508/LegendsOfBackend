import express from "express";
import { getUser, getUsers, createUser } from "../controllers/user.js";

///is file me sare routes rahenge user ke
/// app ki jagah router isliye use kiya taki ham prefix use kar paye route me
/// isme har ek routes se pehle /users lag jayega app.js file me dekho
const router = express.Router();

router.get("/all", getUsers);

router.get("/userid/:id", getUser);

router.post("/new", createUser);

export default router;
