import { Router } from "express";
import { UserRoutes } from "./users/routes";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/users", UserRoutes.routes);
    router.use("/api/v1/auth", AuthRoutes.routes);

    return router;
  }
}
