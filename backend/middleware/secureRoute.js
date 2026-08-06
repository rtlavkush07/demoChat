import jwt from "jsonwebtoken";
import User from '../models/user.model.js';

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("Raw cookies:", req.headers.cookie);
    console.log("Parsed cookies:", req.cookies);
    console.log("JWT token:", req.cookies.jwt);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const verified = jwt.verify(token, process.env.JWT_TOKEN);

    if (!verified) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Save user to req
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default secureRoute;
