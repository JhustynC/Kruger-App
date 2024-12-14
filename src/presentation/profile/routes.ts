import { Router } from "express";
import { Request, Response } from "express";
import {
  isAuthenticated,
  isEmailRegistered,
} from "../auth/middleware/auth.middleware";
import { ProfileController } from "./controller";
import { UserDatasourceImp } from "../../infrastructure/datasources/user.datasource";
import { UserRepositoryImp } from "../../infrastructure/repositories/user.repository";
import { LogRepositoryImpl } from "../../infrastructure/repositories/log.repository.imp";
import { FileSystemDatasource } from "../../infrastructure/datasources/file-system.datasources";

const asyncHandler = (fn: any) => (req: Request, res: Response, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export class ProfileRoutes {
  static get routes(): Router {
    const router = Router();
    const logsRepositoy = new LogRepositoryImpl(new FileSystemDatasource());
    const profileController = new ProfileController(logsRepositoy);

    // Ruta para optener las opciones del administrador
    router.get(
      "/roles",
      isAuthenticated,
      isEmailRegistered,
      asyncHandler(profileController.roles)
    );

    return router;
  }
}
