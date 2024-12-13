import { Request, Response } from "express";
import { UserRol } from "../../domain/entities/user.entity";

export class ProfileController {
  public profile = (req: Request, res: Response) => {
    const user = req.user as any;

    console.log("ESTOY AQUI EN PROFILE");
    console.log(req.user);

    if (user.role === UserRol.ADMIN) {
      if (!user) {
        return res.redirect("/login"); // Si no está autenticado, redirige al login
      }

      let formHtml = ""; // Variable para almacenar el formulario si es necesario

      // Mostrar el formulario de crear nuevo cliente
      if (req.query.createClient === "true") {
        formHtml = `
      <h1>Create New Client</h1>
      <form action="/profile" method="POST">
        <label for="cedula">Cédula:</label>
        <input type="text" id="cedula" name="cedula" required /><br />

        <label for="coordinates">Coordinates:</label>
        <input type="text" id="coordinates" name="coordinates" placeholder="Latitud, Longitud" required /><br />
        
        <label for="firstName">Nombres:</label>
        <input type="text" id="firstName" name="firstName" required /><br />

        <label for="lastName">Apellidos:</label>
        <input type="text" id="lastName" name="lastName" required /><br />

        <label for="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" required /><br />
        
        <button type="submit" name="action" value="createClient">Create Client</button>
      </form>
    `;
      }

      // Mostrar el formulario de crear nuevo sector
      if (req.query.createSector === "true") {
        formHtml = `
      <h1>Create New Sector</h1>
      <form action="/profile" method="POST">
        <label for="sectorName">Nombre del Sector:</label>
        <input type="text" id="sectorName" name="sectorName" required /><br />

        <label for="polygon">Polígono de Coordenadas:</label>
        <textarea id="polygon" name="polygon" rows="4" cols="50" placeholder="((lat1,lon1),(lat2,lon2),...)" required></textarea><br />
        
        <button type="submit" name="action" value="createSector">Create Sector</button>
      </form>
    `;
      }

      // Mostrar el formulario de crear nueva interrupción
      if (req.query.createInterruption === "true") {
        formHtml = `
      <h1>Create New Interruption</h1>
      <form action="/profile" method="POST">
        <label for="startTime">Hora de Inicio (24 horas):</label>
        <input type="time" id="startTime" name="startTime" required /><br />
        
        <label for="endTime">Hora de Fin (24 horas):</label>
        <input type="time" id="endTime" name="endTime" required /><br />

        <label for="sector">Nombre del Sector:</label>
        <input type="text" id="sector" name="sector" required /><br />
        
        <button type="submit" name="action" value="createInterruption">Create Interruption</button>
      </form>
    `;
      }

      // Responder con los botones y el formulario según sea necesario
      res.send(`
    <h1>Welcome ${user.displayName}</h1>
    <p>You are logged in as an admin.</p>
    <button><a href="/profile?createClient=true">Create New Client</a></button>
    <button><a href="/profile?createSector=true">Create New Sector</a></button>
    <button><a href="/profile?createInterruption=true">Create New Interruption</a></button>
    
    ${formHtml} <!-- Aquí se inserta el formulario dinámicamente -->
  `);
    } else if (user.role === UserRol.CLIENT) {
      // Si es cliente, mostrar solo la opción para revisar interrupciones
      res.send(`
        <h1>Welcome ${user.displayName}</h1>
        <p>You are logged in as a client.</p>
        <button><a href="/check-interruptions">Check Interruptions</a></button>
      `);
    } else {
      res.send(`<h1>Role not recognized</h1>`);
    }
  };
}
