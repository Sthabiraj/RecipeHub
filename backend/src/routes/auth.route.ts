import { Router } from "express";
import {
  checkAuth,
  login,
  logout,
  register,
} from "../controllers/auth.controller";
import { verifyToken } from "../middlewares";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/check-auth", verifyToken, checkAuth);

export default authRoutes;
