import { Router } from "express";
import {
  changePassword,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/user.controller";
import authenticate from "../middlewares/auth";

const userRoutes = Router();

userRoutes.get("/:id", getUserById);
userRoutes.put("/:id", authenticate, updateUser);
userRoutes.delete("/:id", authenticate, deleteUser);
userRoutes.patch("/:id", authenticate, changePassword);

export default userRoutes;
