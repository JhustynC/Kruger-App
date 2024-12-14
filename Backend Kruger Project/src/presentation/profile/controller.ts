import { Request, Response } from "express";
import { UserRol } from "../../domain/entities/user.entity";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { AbsLogRepository } from "../../domain/repositories/log.repository";

export class ProfileController {
  private origin: string = "profile.controller.ts";

  //*DI
  constructor(private readonly logRepository: AbsLogRepository) {}

  public roles = async (req: Request, res: Response) => {
    const user = req.user as any; // Asegúrate de que 'req.user' contiene la información correcta
    const logEntity = new LogEntity({
      level: LogSeverityLevel.medium,
      message: `User with ${user.email || user.mail} login successfully`,
      origin: this.origin,
    });
    await this.logRepository.saveLog(logEntity);

    // console.log(user);
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
