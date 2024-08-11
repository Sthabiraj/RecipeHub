import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User, Recipe } from "../models";

// Get user by ID
const getUserById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: (error as Error).message,
    });
  }
};

// Update user
const updateUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { name, email, bio, address, profileImage, socialLinks } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (address) user.address = address;
    if (profileImage) user.profileImage = profileImage;
    if (socialLinks) user.socialLinks = socialLinks;

    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: (error as Error).message,
    });
  }
};

// Delete user
const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete all recipes created by this user
    await Recipe.deleteMany({ creator: req.params.id });

    // Delete the user
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: (error as Error).message,
    });
  }
};

// Change user password
const changePassword = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error changing password",
      error: (error as Error).message,
    });
  }
};

export { getUserById, updateUser, deleteUser, changePassword };
