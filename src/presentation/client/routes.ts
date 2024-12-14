import { Router } from "express";
import {
  isAuthenticated,
  isEmailRegistered,
} from "../auth/middleware/auth.middleware";

import { ClientController } from "./controller";
import { InterruptionRepositoryImp } from "../../infrastructure/repositories/interruption.repository";
import { InterruptionDatasourceImp } from "../../infrastructure/datasources/interruption.datasource";

export class ClientRoutes {
  static get routes(): Router {
    const router = Router();
    const interruptionRepository = new InterruptionRepositoryImp(
      new InterruptionDatasourceImp()
    );
    const clientController = new ClientController(interruptionRepository);

    router.get(
      "/dashboard",
      isAuthenticated,
      isEmailRegistered,
      clientController.dasboard
    );

    router.post("/fetch-interruption", clientController.fetchInterruption);

    return router;
  }
}
