import { Request, Response } from "express";
import { GetInterruptionByCoordinates } from "../../domain/uses-cases/interruption/get-interruption.usecase";
import { AbsInterruptionRepository } from "../../domain/repositories/interruption.repository";
import { InterruptionEntity } from "../../domain/entities/interruption.entity";

export class ClientController {
  //*DI
  constructor(private readonly repository: AbsInterruptionRepository) {}

  public dasboard = async (req: Request, res: Response) => {
    const user = req.user as any; // Asegúrate de que 'req.user' contiene la información correcta

    if (!user) {
      return res.redirect("/login");
    }

    // Capturar las opciones seleccionadas
    let interruptions: any[] = [];

    res.render("clientDashboard", {
      displayName: user.displayName || user.names,
      interruptions,
    });
  };

  public fetchInterruption = async (req: Request, res: Response) => {
    let { coordinates } = req.body;
    const user = req.user as any;
    console.log(coordinates);
    coordinates = coordinates.split(",").map(Number);

    new GetInterruptionByCoordinates(this.repository)

      .exceute(coordinates)
      .then((interruptionDb) => {
        if (interruptionDb) {
          const interruption = {
            ...interruptionDb,
            startTime: InterruptionEntity.formatTimeToHHMM(
              interruptionDb!.startTime.toString()
            ),
            endTime: InterruptionEntity.formatTimeToHHMM(
              interruptionDb!.endTime.toString()
            ),
          };
          return res.render("clientDashboard", {
            interruptions: [interruption],
          });
        }

        let interruptions: any[] = [];

        return res.render("clientDashboard", {
          displayName: user.displayName || user.names,
          interruptions,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ error: `${err}` });
      });
  };
}
