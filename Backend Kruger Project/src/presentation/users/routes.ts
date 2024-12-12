import { Router } from "express";
import { UserController } from "./controller";
import { UserRepositoryImp } from "../../infrastructure/repositories/user.repository";
import { UserDatasourceImp } from "../../infrastructure/datasources/user.datasource";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const userRepository = new UserRepositoryImp(new UserDatasourceImp());
    const userController = new UserController(userRepository);

    router.get("/", userController.getUsers);
    router.get("/:id", userController.getUserById);
    router.post("/", userController.createUser.bind(userController));
    router.put("/:id", userController.updateUser);
    router.delete("/:id", userController.deleteUser);

    return router;
  }
}
