import { Request, Response } from "express";
import { UserEntity } from "../../domain/entities/user.entity";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
import { AbsUserRepository } from "../../domain/repositories/user.repository";
import {
  CreateUser,
  DeleteUser,
  GetUsers,
  UpdateUser,
} from "../../domain/uses-cases/user";
import { prisma } from "../../config/data/postgres";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";
import { CreateSectorDto } from "../../domain/dtos/sector/create-sector.dto";
import { CreateSector } from "../../domain/uses-cases/sector/create-sector.usecase";
import { AbsInterruptionRepository } from "../../domain/repositories/interruption.repository";
import { DeleteSector } from "../../domain/uses-cases/sector/delete-sector.usecase";
import { UpdateSector } from "../../domain/uses-cases/sector/update-sector";
import { UpdateSectorDto } from "../../domain/dtos/sector/update-sector.dto";
import { CreateInterruption } from "../../domain/uses-cases/interruption/create-interruption.usecase";
import { CreateInterruptionDto } from "../../domain/dtos/interruption/create-interruption.dto";
import { DeleteInterruption } from "../../domain/uses-cases/interruption/delete-interruption.usecase";
import { UpdateInterruptionDto } from "../../domain/dtos/interruption/update-interruption.dto";
import { UpdateInterruption } from "../../domain/uses-cases/interruption/update-interruption.usecase";
import { InterruptionEntity } from "../../domain/entities/interruption.entity";
import { AbsLogRepository } from "../../domain/repositories/log.repository";

export class AdminController {
  //*DI
  constructor(
    private readonly repositoryUser: AbsUserRepository,
    private readonly repositoryInterrupton: AbsInterruptionRepository,
    private readonly repositoryLogs: AbsLogRepository
  ) {}

  //! Para la vista del Administrador
  public dasboard = async (req: Request, res: Response) => {
    const user = req.user as any; // Asegúrate de que 'req.user' contiene la información correcta

    if (!user) {
      return res.redirect("/login");
    }

    // Capturar las opciones seleccionadas
    const clientOptions = req.query.clientOptions || null;
    const createClientForm = req.query.createClientForm || null;
    const listClientsForm = req.query.listClientsForm || null;
    const deleteClientForm = req.query.deleteClientForm || null;
    const updateClientForm = req.query.updateClientForm || null;

    // Opciones para los sectores
    const sectorOptions = req.query.sectorOptions || null;
    const createSectorForm = req.query.createSectorForm || null;
    const listSectorsForm = req.query.listSectorsForm || null;
    const deleteSectorForm = req.query.deleteSectorForm || null;
    const updateSectorForm = req.query.updateSectorForm || null;

    // Opciones para las interrupciones
    const interruptionOptions = req.query.interruptionOptions || null;
    const createInterruptionForm = req.query.createInterruptionForm || null;
    const listInterruptionsForm = req.query.listInterruptionsForm || null;
    const deleteInterruptionForm = req.query.deleteInterruptionForm || null;
    const updateInterruptionForm = req.query.updateInterruptionForm || null;

    // Obtener la lista de clientes solo cuando se selecciona 'listClientsForm=true'
    let users: UserEntity[] = [];
    if (listClientsForm === "true") {
      users = (await prisma.user.findMany()).map((user) =>
        UserEntity.fromObject(user)
      );
    }

    // Obtener la lista de sectores
    let sectors: any[] = [];
    if (listSectorsForm === "true") {
      sectors = await prisma.sector.findMany(); // Suponiendo que tienes una tabla sector
    }

    // Obtener la lista de interrupciones
    let interruptions: any[] = [];
    if (listInterruptionsForm === "true") {
      interruptions = await prisma.interruption.findMany(); // Suponiendo que tienes una tabla interruption
    }

    // Renderizar la vista del dashboard con los parámetros correspondientes
    res.render("adminDashboard", {
      displayName: user.displayName || user.names,
      clientOptions: clientOptions,
      sectorOptions,
      interruptionOptions,
      createSectorForm,
      deleteSectorForm,
      createInterruptionForm,
      deleteInterruptionForm,
      listSectorsForm,
      updateSectorForm,
      listInterruptionsForm,
      updateInterruptionForm,
      createClientForm: createClientForm,
      deleteClientForm: deleteClientForm,
      listClientsForm: listClientsForm,
      updateClientForm: updateClientForm,
      clients: users, // Pasar la lista de clientes para ser mostrada
      sectors: sectors, // Pasar la lista de sectores
      interruptions, // Pasar la lista de interrupciones
    });
  };

  //----------------------------------------------------------------
  // Manejar la creación de un cliente
  public createUser = async (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body);
    if (error) res.status(400).json({ error: error });

    new CreateUser(this.repositoryUser, this.repositoryLogs)
      .exceute(createUserDto!)
      .then(() => res.redirect("/admin/dashboard?clientOptions=true")) // Redirige a la lista de clientes
      .catch((err) => res.status(404).json({ error: `${err}` }));
  };

  // Manejar la eliminación de un cliente
  public deleteClient = (req: Request, res: Response) => {
    const { idCard } = req.params;

    new DeleteUser(this.repositoryUser, this.repositoryLogs)
      .exceute(idCard)
      .then(() =>
        res.redirect(
          "/admin/dashboard?listClientsForm=true&message=Cliente eliminado con éxito"
        )
      ); // Redirige a la lista de clientes
  };

  // Manejar la actualización de un cliente
  public editUser = async (req: Request, res: Response) => {
    const { idCard } = req.params;

    try {
      const user = await prisma.user.findUnique({
        where: { idCard },
      });

      if (!user) {
        return res.status(404).send("Usuario no encontrado");
      }

      return res.render("editUser", { user }); // Renderiza el formulario con los datos del usuario
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al cargar los datos del usuario");
    }
  };

  public updateUser = async (req: Request, res: Response) => {
    const [error, updateUserDto] = UpdateUserDto.create({
      ...req.body,
    });
    if (error) return res.status(400).json({ error });

    new UpdateUser(this.repositoryUser, this.repositoryLogs)
      .exceute(updateUserDto!)
      .then((user) => res.redirect("/admin/dashboard?listClientsForm=true"))
      .catch((err) => res.status(404).json({ error: `${err}` }));
  };

  public getUsers = async (req: Request, res: Response) => {
    new GetUsers(this.repositoryUser)
      .exceute()
      .then((users) => {
        res.render("users", { users });
      })
      .catch((err) => res.status(404).json({ error: `${err}` }));
  };

  //----------------------------------------------------------------
  public createSector = async (req: Request, res: Response) => {
    console.log(req.body);
    const [error, createSectorDto] = CreateSectorDto.create(req.body);
    if (error) res.status(400).json({ error: error });

    new CreateSector(this.repositoryInterrupton, this.repositoryLogs)
      .exceute(createSectorDto!)
      .then((sector) => {
        res.redirect("/admin/dashboard?sectorOptions=true"); // Redirige a la lista de clientes
      })
      .catch((err) => res.status(404).json({ error: `${err}` }));
  };

  public deleteSector = (req: Request, res: Response) => {
    const { id } = req.params;

    new DeleteSector(this.repositoryInterrupton, this.repositoryLogs)
      .exceute(+id)
      .then(() =>
        res.redirect(
          "/admin/dashboard?listSectorsForm=true&message=Sector eliminado con éxito"
        )
      );
  };

  // Manejar la actualización de un cliente
  public editSector = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const sector = await prisma.sector.findUnique({
        where: {
          id: +id,
        },
      });

      if (!sector) {
        return res.status(404).send("Sector no encontrado");
      }

      return res.render("editSector", { sector }); // Renderiza el formulario con los datos del setor
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al cargar los datos del sector");
    }
  };

  public updateSector = async (req: Request, res: Response) => {
    const [error, updateSectorDto] = UpdateSectorDto.create({
      ...req.body,
    });
    if (error) return res.status(400).json({ error });

    new UpdateSector(this.repositoryInterrupton, this.repositoryLogs)
      .exceute(updateSectorDto!)
      .then(() => res.redirect("/admin/dashboard?listSectorsForm=true"))
      .catch((err) => res.status(404).json({ error: `${err}` }));
  };
  //----------------------------------------------------------------
  public createInterruption = async (req: Request, res: Response) => {
    console.log(req.body);
    const [error, createInterruptionDto] = CreateInterruptionDto.create(
      req.body
    );
    console.log("ESTO ES DEPUES DE DTO");
    console.log(error);

    if (error) res.status(400).json({ error: error });

    new CreateInterruption(this.repositoryInterrupton)
      .exceute(createInterruptionDto!)
      .then(() => res.redirect("/admin/dashboard?interruptionOptions=true")) // Redirige a la lista de clientes
      .catch((err) => res.status(404).json({ error: `${err}` }));
  };

  public deleteInterruption = (req: Request, res: Response) => {
    const { id } = req.params;

    new DeleteInterruption(this.repositoryInterrupton)
      .exceute(+id)
      .then(() =>
        res.redirect(
          "/admin/dashboard?listInterruptionsForm=true&message=Interrupcion eliminada con éxito"
        )
      ); // Redirige a la lista de clientes
  };

  // Manejar la actualización de un cliente
  public editInterruption = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const interruptionDb = await prisma.interruption.findUnique({
        where: { id: +id },
      });

      if (!interruptionDb) {
        return res.status(404).send("Interrupcion no encontrada");
      }
      console.log(interruptionDb);
      const interruption = {
        ...interruptionDb,
        startTime: InterruptionEntity.formatTimeToHHMM(
          interruptionDb.startTime.toString()
        ),
        endTime: InterruptionEntity.formatTimeToHHMM(
          interruptionDb.endTime.toString()
        ),
      };

      return res.render("editInterruption", { interruption }); // Renderiza el formulario con los datos del usuario
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("Error al cargar los datos del la interupcion");
    }
  };

  public updateInterruption = async (req: Request, res: Response) => {
    console.log("Valores del formulario");
    console.log(req.body);
    const [error, updateInterruptionDto] = UpdateInterruptionDto.create({
      ...req.body,
    });

    console.log(`Esto es del error de UPDATE: ${error}`);
    if (error) return res.status(400).json({ error });

    new UpdateInterruption(this.repositoryInterrupton)
      .exceute(updateInterruptionDto!)
      .then(() => res.redirect("/admin/dashboard?listInterruptionsForm=true"))
      .catch((err) => res.status(404).json({ error: `${err}` }));
  };
}
