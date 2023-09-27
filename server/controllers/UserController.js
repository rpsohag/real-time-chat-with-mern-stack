import validator from "validator";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import User from "./../models/User.js";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Please fill all the fields",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Please enter a valid email" });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Please enter a strong password" });
    }
    if (user) {
      return res
        .status(400)
        .json({ error: "User with the given email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hashPassword });
    await user.save();
    const token = createToken(user._id);
    res
      .status(201)
      .json({ message: "User created successfully", token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
