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
  id: string;
  email: string;
  name: string;
  role: string;
}

// Extend the Express Request type to include our custom user property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const authenticate = (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({
      success: false,
      message: "Invalid authorization header format.",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.user = decoded;
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
    res.status(500).json({
      success: false,
      message: "An error occurred while authenticating.",
      error: (err as Error).message,
    });
  }
};

export default authenticate;
