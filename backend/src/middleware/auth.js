import jwt from "jsonwebtoken";

const authuser = (req, res, next) => {
  try {
    // Parse standard Authorization header first, fallback to direct token header
    let token = req.headers.token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7); // Extract token after "Bearer "
    }

    console.log("Extracted token:", token ? "present" : "missing");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded:", decoded);
 ;
    req.user = { id: decoded.id }; // Attach directly to the req object
    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authuser;
