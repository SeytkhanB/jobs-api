import dotenv from "dotenv";
import JWT from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";
dotenv.config();

// here we check if user exists and indentify them in order to
// pass them to "next()", in order to the user can make request
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);

    // ALTERNATIVE WAY TO GET USER
    // const user = await UserSchema.findById(decoded.userId).select("-password");
    // req.user = user;

    req.user = {
      userId: decoded.userId,
      name: decoded.name,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route!");
  }
};

export default authMiddleware;
