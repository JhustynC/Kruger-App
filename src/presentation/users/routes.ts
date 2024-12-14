import { Router } from "express";
import { UserController } from "./controller";
import { UserRepositoryImp } from "../../infrastructure/repositories/user.repository";
import { UserDatasourceImp } from "../../infrastructure/datasources/user.datasource";
import { FileSystemDatasource } from "../../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../../infrastructure/repositories/log.repository.imp";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const userRepository = new UserRepositoryImp(new UserDatasourceImp());
    const logsRepositoy = new LogRepositoryImpl(new FileSystemDatasource());
    const userController = new UserController(userRepository, logsRepositoy);

    router.get("/", userController.getUsers);
    router.get("/:id", userController.getUserById);
    router.post("/", userController.createUser.bind(userController));
    router.put("/:id", userController.updateUser);
    router.delete("/:id", userController.deleteUser);

    return router;
  }
}
