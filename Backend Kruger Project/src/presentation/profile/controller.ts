import { Request, Response } from "express";
import { UserRol } from "../../domain/entities/user.entity";
import { renderTemplate } from "../common/renderTemplate";
import { htmlComponent } from "../common/renderHtml";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
import { AbsUserRepository } from "../../domain/repositories/user.repository";
import { CreateUser } from "../../domain/uses-cases/user";

export class ProfileController {
  //*DI
  constructor(private readonly repository: AbsUserRepository) {}

  public profile = (req: Request, res: Response) => {
    const user = req.user as any;

    if (user.role === UserRol.ADMIN) {
      if (!user) {
        return res.redirect("/login");
      }

      let dynamicContent = "";

      try {
        if (req.query.clientOptions === "true") {
          dynamicContent = htmlComponent(
            "../profile/views/admin/clientOptions.html"
          );
        } else if (req.query.createClientForm === "true") {
          dynamicContent = htmlComponent(
            "../profile/views/admin/clients/createCllient.html"
          );
        } else if (req.query.deleteClientForm === "true") {
          dynamicContent = htmlComponent(
            "../profile/views/admin/clients/createCllient.html"
          );
        } else if (req.query.listClientsForm === "true") {
          dynamicContent = htmlComponent(
            "../profile/views/admin/clients/createCllient.html"
          );
        } else if (req.query.updateClientForm === "true") {
          dynamicContent = htmlComponent(
            "../profile/views/admin/clients/createCllient.html"
          );
        } else {
          console.log("No valid query parameter detected.");
        }
      } catch (error) {
        console.error("Error loading dynamic content:", error);
        dynamicContent = `<h1>Error</h1><p>No se pudo cargar el contenido dinámico.</p>`;
      }

      // Renderizar la plantilla
      //Como es un recurso que se encuentra en otro modulo necesitamos
      //especificar la ruta relativa desde ese recurso
      const html = renderTemplate(
        "../profile/views/admin/adminDashboard.html",
        {
          displayName: user.displayName,
          dynamicContent,
        }
      );

      res.send(html);
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
  public createClient = async (req: Request, res: Response) => {
    console.log("ESTOY CREANDO UN CLEINTE");
    const [error, createUserDto] = CreateUserDto.create(req.body);
    if (error) res.status(400).json({ error: error });

    new CreateUser(this.repository)
      .exceute(createUserDto!)
      .then((user) => res.json(user))
      .catch((err) => res.status(404).json({ error: `${err}` }));

    // // Redirigir después de crear el cliente
    // return res.redirect("/profile?listClientsForm=true"); // Redirige a la lista de clientes
  };

  // Manejar la eliminación de un cliente
  public deleteClient = (req: Request, res: Response) => {
    const { cedula } = req.body;

    // Aquí agregarías la lógica para eliminar el cliente de la base de datos
    console.log("Cliente eliminado:", { cedula });

    // Redirigir después de eliminar el cliente
    res.redirect("/profile?listClients=true"); // Redirige a la lista de clientes
  };

  // Manejar la actualización de un cliente
  public updateClient = (req: Request, res: Response) => {
    const { cedula, newCoordinates, newFirstName, newLastName, newEmail } =
      req.body;

    // Aquí agregarías la lógica para actualizar los datos del cliente en la base de datos
    console.log("Cliente actualizado:", {
      cedula,
      newCoordinates,
      newFirstName,
      newLastName,
      newEmail,
    });

    // Redirigir después de actualizar el cliente
    res.redirect("/profile?listClients=true"); // Redirige a la lista de clientes
  };
}
