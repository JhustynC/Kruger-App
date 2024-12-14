import { Router } from "express";
import { UserRoutes } from "./users/routes";
import { AuthRoutes } from "./auth/routes";
import { isAuthenticated } from "./auth/middleware/auth.middleware";
import { ProfileRoutes } from "./profile/routes";
import { AdminRoutes } from "./admin/routes";
import { ClientRoutes } from "./client/routes";

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

    //! Ruta principal para el perfil (redirige al dashboard)
    router.get("/admin", isAuthenticated, (req, res) => {
      res.redirect("/admin/dashboard");
    });
    router.get("/client", isAuthenticated, (req, res) => {
      res.redirect("/client/dashboard");
    });

    // Ruta para el perfil de usuario
    router.get("/profile", isAuthenticated, (req, res) => {
      res.redirect("/profile/roles");
    });

    // Rutas del perfil
    router.use("/profile", isAuthenticated, ProfileRoutes.routes);
    // router.use("/profile/admin", isAuthenticated, AdminRoutes.routes);

    //* Para clientes
    router.use("/client", isAuthenticated, ClientRoutes.routes);

    //* Para administradores
    router.use("/admin", isAuthenticated, AdminRoutes.routes);

    // Middleware para manejar rutas desconocidas
    router.use((req, res) => {
      if (req.isAuthenticated()) {
        res.redirect("/profile/roles"); // Redirige al perfil si está autenticado
      } else {
        res.redirect("/auth/login"); // Redirige al login si no está autenticado
      }
    });

    return router;
  }
}
