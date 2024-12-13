import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { AuthController } from "./controller";
import "dotenv/config";
import passport from "passport";

// Wrapper para manejar automáticamente los errores de funciones asincrónicas
const asyncHandler = (fn: any) => (req: Request, res: Response, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const authController = new AuthController();

    router.get("/login", authController.login);
    router.post(
      "/login-credentials",
      asyncHandler(authController.loginWithCredentials)
    );

    router.get(
      "/google",
      passport.authenticate("google", { scope: ["profile", "email"] })
    );

    router.get(
      "/google/callback",
      passport.authenticate("google", { failureRedirect: "/login" }),
      asyncHandler(authController.loginCallback)
    );

    router.get("/logout", authController.logout);

    return router;
  }
}
