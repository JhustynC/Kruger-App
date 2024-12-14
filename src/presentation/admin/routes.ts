import { Router } from "express";
import { Request, Response } from "express";
import {
  isAuthenticated,
  isEmailRegistered,
} from "../auth/middleware/auth.middleware";

import { UserDatasourceImp } from "../../infrastructure/datasources/user.datasource";
import { UserRepositoryImp } from "../../infrastructure/repositories/user.repository";
import { AdminController } from "./controller";
import { InterruptionRepositoryImp } from "../../infrastructure/repositories/interruption.repository";
import { InterruptionDatasourceImp } from "../../infrastructure/datasources/interruption.datasource";
import { LogRepositoryImpl } from "../../infrastructure/repositories/log.repository.imp";
import { FileSystemDatasource } from "../../infrastructure/datasources/file-system.datasources";

const asyncHandler = (fn: any) => (req: Request, res: Response, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export class AdminRoutes {
  static get routes(): Router {
    const router = Router();
    const userRepository = new UserRepositoryImp(new UserDatasourceImp());
    const interruptionRepository = new InterruptionRepositoryImp(
      new InterruptionDatasourceImp()
    );
    const logsRepositoy = new LogRepositoryImpl(new FileSystemDatasource());
    const adminController = new AdminController(
      userRepository,
      interruptionRepository,
      logsRepositoy
    );

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
    router.post("/create-sector", adminController.createSector);
    router.get("/delete-sector/:id", adminController.deleteSector);
    router.get("/edit-sector/:id", asyncHandler(adminController.editSector));
    router.post("/update-sector", asyncHandler(adminController.updateSector));

    // Rutas para la gestion de interrupciones
    router.post(
      "/create-interruption",
      adminController.createInterruption.bind(adminController)
    );
    router.get("/delete-interruption/:id", adminController.deleteInterruption);
    router.get(
      "/edit-interruption/:id",
      asyncHandler(adminController.editInterruption)
    );
    router.post(
      "/upate-interruption",
      asyncHandler(adminController.updateInterruption)
    );

    return router;
  }
}
