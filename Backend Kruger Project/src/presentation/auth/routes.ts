import { Router } from "express";
import { AuthController } from "./controller";
import "dotenv/config";
import { Request, Response } from "express";
import passport from "passport";
import {
  isAuthenticated,
  isEmailRegistered,
} from "./middleware/auth.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const userController = new AuthController();

    router.get("/login", (req: Request, res: Response) => {
      res.send("<a href='/auth/google'>Login with Google</a>");
    });

    router.get(
      "/google",
      passport.authenticate("google", { scope: ["profile", "email"] })
    );

    router.get(
      "/google/callback",
      passport.authenticate("google", { failureRedirect: "/" }),
      (req: Request, res: Response) => {
        //? Se coloca el /auth/profile ya que la ruta /profile no es accsesible desde
        //? el controlador principal
        res.redirect("/auth/profile"); // Cambiado a /auth/profile
      }
    );

    // Ruta protegida
    router.get(
      "/profile",
      isAuthenticated,
      isEmailRegistered,
      (req: Request, res: Response) => {
        res.send(
          `Welcome ${req.user ? (req.user as any).displayName : "Guest"}`
        );
      }
    );

    router.get("/logout", (req: Request, res: Response) => {
      req.logout((err) => {
        if (err) {
          console.error(err);
        }
        res.redirect("/");
      });
    });

    return router;
  }
}
