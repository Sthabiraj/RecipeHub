import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Define the structure of API responses
interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Define the structure of the JWT payload
interface JwtPayload {
  userId: string;
  role: string;
}

// Extend the Express Request type to include our custom user property
declare global {
  namespace Express {
    interface Request {
      userId: string;
      userRole: string;
    }
  }
}

// Verify the token provided in the request
export const verifyToken = (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Token has expired.",
      });
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "An error occurred while authenticating.",
      error: (err as Error).message,
    });
  }
};
