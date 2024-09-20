import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../types";

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
  res: Response<ApiResponse<null>>,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Access denied. No token provided." });
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
        error: "Token has expired.",
      });
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        error: "Invalid token.",
      });
    }
    return res.status(500).json({
      success: false,
      error: "An error occurred while authenticating.",
    });
  }
};
