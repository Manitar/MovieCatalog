import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
const secret_key = process.env.JWT_SECRET_KEY
export const validateToken = async (req, res) => {
  try {
    const token = req.query.token
    if (token) {
      const decoded = jwt.verify(token, secret_key)
      res.status(202).json(token)
    }
  }
  catch (error) {
    res.status(403).json({ error: "Not authorized" })
  }
}
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    const checkEmail = await User.findOne({ email })
    if (checkEmail) {
      res.status(409).json({ error: "A user with that email already exists" })
      return
    }
    // Let's hash the password
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Use the hashed password
      likedMovies: [],
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser)


  }
  catch (error) {
    res.status(500).json({ error: "Could not register user" })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Password does not match" });
    }


    const token = jwt.sign({ email: user.email, firstName: user.firstName, lastName: user.lastName }, secret_key, { expiresIn: '5h' });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Could not login" });
  }
};