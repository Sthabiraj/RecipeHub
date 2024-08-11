import { Request, Response } from "express";
import { User } from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nameToSlug from "../utils/nameToSlug";

// Define input types for registration and login
interface RegisterInput {
  name: string;
  email: string;
  password: string;
  coverImage?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

// Define the structure of API responses
interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
  user?: any;
  token?: string;
}

// Register a new user
const register = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response<ApiResponse>
) => {
  try {
    const { name, email, password, coverImage } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409) // Conflict status code
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      coverImage: coverImage
        ? coverImage
        : `https://ui-avatars.com/api/?name=${nameToSlug(name)}&background=random&rounded=true`,
    });

    await newUser.save();

    // Remove password from the user object before sending in response
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({
      // Created status code
      success: true,
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    // Handle any errors during registration
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: (error as Error).message,
    });
  }
};

//  Login an existing user
const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response<ApiResponse>
) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401) // Unauthorized status code
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    // Remove password from the user object before sending in response
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    // Handle any errors during login
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: (error as Error).message,
    });
  }
};

export { register, login };
