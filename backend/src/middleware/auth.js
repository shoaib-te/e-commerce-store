import jwt from "jsonwebtoken";

const authuser = (req, res, next) => {
  try {
    // Parse standard Authorization header first, fallback to direct token header
    let token = req.headers.token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7); // Extract token after "Bearer "
    }

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
 ;
    req.user = { id: decoded.id }; // Attach directly to the req object
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authuser;
