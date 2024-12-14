import { Router } from "express";
import { Request, Response } from "express";
import {
  isAuthenticated,
  isEmailRegistered,
} from "../auth/middleware/auth.middleware";

import { UserDatasourceImp } from "../../infrastructure/datasources/user.datasource";
import { UserRepositoryImp } from "../../infrastructure/repositories/user.repository";
import { AdminController } from "./controller";

const asyncHandler = (fn: any) => (req: Request, res: Response, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export class AdminRoutes {
  static get routes(): Router {
    const router = Router();
    const userRepository = new UserRepositoryImp(new UserDatasourceImp());
    const adminController = new AdminController(userRepository);

    router.get(
      "/dashboard",
      isAuthenticated,
      isEmailRegistered,
      adminController.dasboard
    );

    // Rutas para la gestion de usuarios
    router.post("/", adminController.createUser.bind(adminController));
    router.get("/delete-user/:idCard", adminController.deleteClient);
    router.get("/edit-user/:idCard", asyncHandler(adminController.editUser));
    router.post("/update-user", asyncHandler(adminController.updateUser));

    // Rutas para la gestion de sectores

    // Rutas para la gestion de interrupciones

    return router;
  }
}
