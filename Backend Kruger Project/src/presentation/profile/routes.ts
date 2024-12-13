import { Router } from "express";
import { Request, Response } from "express";
import {
  isAuthenticated,
  isEmailRegistered,
} from "../auth/middleware/auth.middleware";
import { ProfileController } from "./controller";
import { UserDatasourceImp } from "../../infrastructure/datasources/user.datasource";
import { UserRepositoryImp } from "../../infrastructure/repositories/user.repository";

const asyncHandler = (fn: any) => (req: Request, res: Response, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export class ProfileRoutes {
  static get routes(): Router {
    const router = Router();
    const userRepository = new UserRepositoryImp(new UserDatasourceImp());
    const profileController = new ProfileController(userRepository);

    // Ruta para optener las opciones del administrador
    router.get(
      "/dashboard",
      isAuthenticated,
      isEmailRegistered,
      profileController.dasboard
    );

    router.post("/", profileController.createUser.bind(profileController));
    router.get("/delete-user/:idCard", profileController.deleteClient);
    router.get("/edit-user/:idCard", asyncHandler(profileController.editUser));
    router.post("/update-user", asyncHandler(profileController.updateUser));

    return router;
  }
}
