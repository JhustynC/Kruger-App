import { Request, Response } from "express";
import { UserEntity, UserRol } from "../../domain/entities/user.entity";
import { AbsUserRepository } from "../../domain/repositories/user.repository";
import { prisma } from "../../config/data/postgres";

export class ClientController {
  //*DI
  constructor(private readonly repository: AbsUserRepository) {}

  public dasboard = async (req: Request, res: Response) => {
    const user = req.user as any; // Asegúrate de que 'req.user' contiene la información correcta

    if (!user) {
      return res.redirect("/login");
    }

    // Capturar las opciones seleccionadas
    const interruptions = req.query.interruptions || null;

    res.render("clientDashboard", {
      displayName: user.displayName || user.names,
      interruptions,
    });
  };
}
