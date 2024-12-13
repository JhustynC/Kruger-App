import { Router } from "express";
import { UserRoutes } from "./users/routes";
import { AuthRoutes } from "./auth/routes";
import { isAuthenticated } from "./auth/middleware/auth.middleware";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Redirige la ruta base a login
    router.get("/", (req, res) => {
      res.redirect("/auth/login");
    });

    // Rutas de autenticación
    router.use("/auth", AuthRoutes.routes);

    // Rutas protegidas
    router.use("/users", isAuthenticated, UserRoutes.routes);

    // Middleware para manejar rutas desconocidas
    router.use((req, res) => {
      res.redirect("/auth/login");
    });

    return router;
  }
}
