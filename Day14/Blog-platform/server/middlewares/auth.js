import jwt from "jsonwebtoken";
import User from "../model/users.js";

 const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // split "Bearer token"
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Auth header:", req.headers.authorization);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default protect;