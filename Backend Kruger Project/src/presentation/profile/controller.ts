import { Request, Response } from "express";
import { UserEntity, UserRol } from "../../domain/entities/user.entity";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
import { AbsUserRepository } from "../../domain/repositories/user.repository";
import {
  CreateUser,
  DeleteUser,
  GetUser,
  GetUsers,
  UpdateUser,
} from "../../domain/uses-cases/user";
import { prisma } from "../../config/data/postgres";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";

export class ProfileController {
  //*DI
  constructor(private readonly repository: AbsUserRepository) {}

  public dasboard = async (req: Request, res: Response) => {
    const user = req.user as any; // Asegúrate de que 'req.user' contiene la información correcta

    if (user.role === UserRol.ADMIN) {
      if (!user) {
        return res.redirect("/login");
      }

      // Capturar las opciones seleccionadas
      const clientOptions = req.query.clientOptions || null;
      const createClientForm = req.query.createClientForm || null;
      const deleteClientForm = req.query.deleteClientForm || null;
      const listClientsForm = req.query.listClientsForm || null;
      const updateClientForm = req.query.updateClientForm || null;

      // Obtener la lista de clientes solo cuando se selecciona 'listClientsForm=true'
      let users: UserEntity[] = [];
      if (listClientsForm === "true") {
        users = (await prisma.user.findMany()).map((user) =>
          UserEntity.fromObject(user)
        );
      }

      // Renderizar la vista del dashboard con los parámetros correspondientes
      res.render("adminDashboard", {
        displayName: user.displayName,
        clientOptions: clientOptions,
        createClientForm: createClientForm,
        deleteClientForm: deleteClientForm,
        listClientsForm: listClientsForm,
        updateClientForm: updateClientForm,
        clients: users, // Pasar la lista de clientes para ser mostrada
      });
    } else if (user.role === UserRol.CLIENT) {
      res.send(`
        <h1>Welcome ${user.displayName}</h1>
        <p>You are logged in as a client.</p>
        <button><a href="/check-interruptions">Check Interruptions</a></button>
      `);
    } else {
      res.send(`<h1>Role not recognized</h1>`);
    }
  };

  // Manejar la creación de un cliente
  public createUser = async (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body);
    if (error) res.status(400).json({ error: error });

    new CreateUser(this.repository)
      .exceute(createUserDto!)
      .then(() => res.redirect("/profile/dashboard?clientOptions=true")) // Redirige a la lista de clientes)
      .catch((err) => res.status(404).json({ error: `${err}` }));
  };

  // Manejar la eliminación de un cliente
  public deleteClient = (req: Request, res: Response) => {
    const { idCard } = req.params;

    new DeleteUser(this.repository)
      .exceute(idCard)
      .then(() =>
        res.redirect("/profile/dashboard?message=Cliente eliminado con éxito")
      ); // Redirige a la lista de clientes)

    // Aquí agregarías la lógica para eliminar el cliente de la base de datos
    console.log("Cliente eliminado:", { idCard: idCard });
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

    //? Using Prisma ORM
    new UpdateUser(this.repository)
      .exceute(updateUserDto!)
      .then((user) => res.redirect("/profile/dashboard?listClientsForm=true"))
      .catch((err) => res.status(404).json({ error: `${err}` }));
  };

  public getUsers = async (req: Request, res: Response) => {
    new GetUsers(this.repository)
      .exceute()
      .then((users) => {
        res.render("users", { users });
        // res.json(users);
      })
      .catch((err) => res.status(404).json({ error: `${err}` }));
  };
}
