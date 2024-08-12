import { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateTokenAndSendCookie = (res: Response, user: IUser) => {
  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  // Send the token as a cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 60 * 60 * 1000, // 7 days
  });
};
