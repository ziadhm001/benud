import User from "../models/user.js";
import { generateCrudMethods } from "../services/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const userCrud = generateCrudMethods(User);
const createUser = async (req, res, next) => {
  const { email, password, name, phoneNumber, birthDate } = req.body;
  try {
    const user = await User.signup(
      email,
      password,
      name,
      phoneNumber,
      birthDate
    );
    const token = createToken(user._id);
    res.status(201).json({ _id: user._id, token, name: user.name });
  } catch (err) {
    next(err);
  }
};


const changePW = async (req, res, next) => {
  const { _id, password, } = req.body;
  try {
    const user = await User.changePassword(
      _id,
      password,
    );
    console.log(user)
    res.status(201).json({ _id: user._id, msg:"Changed Successfully" });
  } catch (err) {
    next(err);
  }
};



const validateUser = async (req, res, next) => {
  const { username, password } = req.body;
  console.log('hi')
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, token, name: user.name, firstTime: user.firstTime, role: user.role });
  } catch (err) {
    next(err);
  }
};


export {
  createUser,
  validateUser,
  changePW,
};