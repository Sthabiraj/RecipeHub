import { Router } from "express";
import {
  changePassword,
  deleteUser,
  getUserByEmail,
  getUserById,
  updateUser,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", getUserByEmail);
userRoutes.get("/:id", getUserById);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);
userRoutes.patch("/:id", changePassword);

export default userRoutes;
