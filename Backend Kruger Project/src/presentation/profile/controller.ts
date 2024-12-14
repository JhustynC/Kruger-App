import { Request, Response } from "express";
import { UserEntity, UserRol } from "../../domain/entities/user.entity";
import { AbsUserRepository } from "../../domain/repositories/user.repository";

export class ProfileController {
  //*DI
  constructor(private readonly repository: AbsUserRepository) {}

  public roles = async (req: Request, res: Response) => {
    const user = req.user as any; // Asegúrate de que 'req.user' contiene la información correcta
    console.log(user);
    if (!user) {
      return res.redirect("/login");
    }
    if (user.role === UserRol.ADMIN) {
      return res.redirect("/admin");
    } else if (user.role === UserRol.CLIENT) {
      return res.redirect("/client");
    } else {
      return res.send(`<h1>Role not recognized</h1>`);
    }
  };
}
