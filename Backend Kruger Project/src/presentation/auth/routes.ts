import { Router } from "express";
import { AuthController } from "./controller";
import {
  login,
  requireRole,
  verifyToken,
} from "../services/generateToken.service";
import { UserRol } from "../../domain/entities/user.entity";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const userController = new AuthController();

    router.post("/login", login);
    router.get(
      "/admin",
      verifyToken,
      requireRole(UserRol.ADMIN),
      (req, res) => {
        res.json({ message: "Acceso permitido para administradores" });
      }
    );

    return router;
  }
}
