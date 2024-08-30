import { Request, Response } from "express";
import { User } from "../models";
import bcrypt from "bcryptjs";
import nameToSlug from "../utils/nameToSlug";
import { IUser } from "../models/user.model";
import { generateTokenAndSendCookie } from "../utils/generateTokenAndSendCookie";

// Define input types for registration and login
interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface RegisterOAuthInput {
  name: string;
  email: string;
  profileImage: string;
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
  user?: IUser;
}

// Register a new user
export const register = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response<ApiResponse>
) => {
  try {
    const { name, email, password } = req.body;

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
      profileImage: `https://ui-avatars.com/api/?name=${nameToSlug(name)}&background=random&rounded=true`,
    });

    await newUser.save();

    // Remove password from the user object before sending in response
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    // Generate JWT token and send it as a cookie
    generateTokenAndSendCookie(res, newUser);

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

export const loginWithOAuth = async (
  req: Request<{}, {}, RegisterOAuthInput>,
  res: Response<ApiResponse>
) => {
  try {
    const { name, email, profileImage } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // Update existing user's information
      user.name = name;
      user.profileImage = profileImage;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "User information updated",
        user: user,
      });
    }

    // Create new user if not exists
    user = new User({
      name,
      email,
      profileImage,
    });

    await user.save();

    // Generate JWT token and send it as a cookie
    generateTokenAndSendCookie(res, user);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing user",
      error: (error as Error).message,
    });
  }
};

//  Login an existing user
export const login = async (
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
    if (user.password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401) // Unauthorized status code
          .json({ success: false, message: "Invalid credentials" });
      }
    }

    // Remove password from the user object before sending in response
    const { password: _, ...userWithoutPassword } = user.toObject();

    // Generate JWT token and send it as a cookie
    generateTokenAndSendCookie(res, user);

    res.json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
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

// Logout a user
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging out",
      error: (error as Error).message,
    });
  }
};

// Check Auth Status
export const checkAuth = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error checking auth status",
      error: (error as Error).message,
    });
  }
};
