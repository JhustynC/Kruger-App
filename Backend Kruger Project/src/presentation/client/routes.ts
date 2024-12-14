import { Router } from "express";
import {
  isAuthenticated,
  isEmailRegistered,
} from "../auth/middleware/auth.middleware";

import { UserDatasourceImp } from "../../infrastructure/datasources/user.datasource";
import { UserRepositoryImp } from "../../infrastructure/repositories/user.repository";
import { ClientController } from "./controller";

export class ClientRoutes {
  static get routes(): Router {
    const router = Router();
    const userRepository = new UserRepositoryImp(new UserDatasourceImp());
    const clientController = new ClientController(userRepository);

    router.get(
      "/dashboard",
      isAuthenticated,
      isEmailRegistered,
      clientController.dasboard
    );

    return router;
  }
}
