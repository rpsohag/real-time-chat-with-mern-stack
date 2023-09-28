import express from "express";
import {
  findUser,
  getUser,
  loginUser,
  registerUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:id", findUser);
router.get("/user", getUser);

export default router;
