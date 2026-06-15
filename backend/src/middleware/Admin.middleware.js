import jwt from "jsonwebtoken";


export const isAdmin = (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token is required",
      });
    }

    const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);

    // Match the payload structure signed in registeradmin controller
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Invalid token permissions",
      });
    }

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
