import { Router } from "express";
import { UserRoutes } from "./users/routes";
import { AuthRoutes } from "./auth/routes";
import { isAuthenticated } from "./auth/middleware/auth.middleware";
import { ProfileRoutes } from "./profile/routes";

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
    // router.use("/users", UserRoutes.routes);

    // Ruta para el perfil de usuario
    router.use("/", ProfileRoutes.routes); 

    // Middleware para manejar rutas desconocidas
    router.use((req, res) => {
      if (req.isAuthenticated()) {
        res.redirect("/profile"); // Redirige al perfil si está autenticado
      } else {
        res.redirect("/auth/login"); // Redirige al login si no está autenticado
      }
    });

    return router;
  }
}
