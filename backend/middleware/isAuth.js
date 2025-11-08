import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token; // safer access
    if (!token) {
      return res.status(400).json({ message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(400).json({ message: "Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("isAuth error:", error);
    return res.status(401).json({ message: "Unauthorized: invalid or expired token" });
  }
};

export default isAuth;
