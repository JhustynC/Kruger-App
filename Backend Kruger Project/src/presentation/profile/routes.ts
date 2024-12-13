import { Router } from "express";
import {
  isAuthenticated,
  isEmailRegistered,
} from "../auth/middleware/auth.middleware";
import { ProfileController } from "./controller";

export class ProfileRoutes {
  static get routes(): Router {
    const router = Router();
    const profileController = new ProfileController();

    // Ruta protegida
    router.get(
      "/profile",
      isAuthenticated,
      isEmailRegistered,
      profileController.profile
    );

    return router;
  }
}
