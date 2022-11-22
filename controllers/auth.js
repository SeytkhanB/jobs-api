import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import UserSchema from "../models/User.js";
dotenv.config();

// --------------------------------------------------
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all credentials");
  }

  const user = await UserSchema.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid email");
  }

  const isPasswordMatches = await user.comparePassword(password);
  if (!isPasswordMatches) {
    throw new UnauthenticatedError("Invalid password");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    success: true,
    user: { name: user.name, email: user.email, userId: user._id },
    token: token,
  });
};

// --------------------------------------------------
const register = async (req, res) => {
  const user = await UserSchema.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    success: true,
    user: { name: user.name, email: user.email, userId: user._id },
    token: token,
  });
};

export { register, login };
