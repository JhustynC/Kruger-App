import { Router } from "express";
import { AuthController } from "./controller";
import "dotenv/config";
import passport from "passport";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const authController = new AuthController();

    router.get("/login", authController.login);
    router.post("/login-credentials", authController.loginWithCredentials);

    router.get(
      "/google",
      passport.authenticate("google", { scope: ["profile", "email"] })
    );

    router.get(
      "/google/callback",
      passport.authenticate("google", { failureRedirect: "/login" }),
      authController.loginCallback
    );

    router.get("/logout", authController.logout);

    return router;
  }
}
