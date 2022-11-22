import dotenv from "dotenv";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
const { Schema } = mongoose;
dotenv.config();

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

// if we use "async/await" we shouldn't use "next()". It will cause of an error
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return JWT.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
