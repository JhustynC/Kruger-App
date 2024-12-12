import { Router } from "express";
import { UserRoutes } from "./users/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/users", UserRoutes.routes);

    return router;
  }
}
