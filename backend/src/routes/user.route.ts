import { Router } from "express";
import {
  changePassword,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/:id", getUserById);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);
userRoutes.patch("/:id", changePassword);

export default userRoutes;
