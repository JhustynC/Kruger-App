import { Request, Response } from "express";
import { AbsUserRepository } from "../../domain/repositories/user.repository";
import {
  CreateUser,
  DeleteUser,
  GetUser,
  GetUsers,
  UpdateUser,
} from "../../domain/uses-cases/user";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";
import { AbsLogRepository } from "../../domain/repositories/log.repository";

export class UserController {
  //*DI
  constructor(
    private readonly repository: AbsUserRepository,
    private readonly repositoryLogs: AbsLogRepository
  ) {}

  public getUsers = (req: Request, res: Response) => {
    new GetUsers(this.repository)
      .exceute()
      .then((users) => res.json(users))
      .catch((err) => res.status(404).json({ error: `${err}` }));
  };

  public getUserById = (req: Request, res: Response) => {
    var userId = req.params.id;
    new GetUser(this.repository)
      .exceute(userId)
      .then((user) => res.json(user))
      .catch((err) => res.status(404).json({ error: `${err}` }));
  };

  public createUser(req: Request, res: Response) {
    const [error, createUserDto] = CreateUserDto.create(req.body);
    if (error) res.status(400).json({ error: error });

    new CreateUser(this.repository, this.repositoryLogs)
      .exceute(createUserDto!)
      .then((user) => res.json(user))
      .catch((err) => res.status(404).json({ error: `${err}` }));
  }

  public updateUser = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateUserDto] = UpdateUserDto.create({ ...req.body, id });
    if (error) res.status(400).json({ error });

    //? Using Prisma ORM
    new UpdateUser(this.repository, this.repositoryLogs)
      .exceute(updateUserDto!)
      .then((user) => res.json(user))
      .catch((err) => res.status(404).json({ error: `${err}` }));
  };

  public deleteUser = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) res.status(400).json({ error: "Invalid ID" });

    new DeleteUser(this.repository, this.repositoryLogs)
      .exceute(id.toFixed(2))
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json({ error: `${err}` }));
  };
}
