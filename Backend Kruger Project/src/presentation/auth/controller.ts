import { Request, Response } from "express";
import { prisma } from "../../config/data/postgres";
import bcrypt from "bcrypt";

export class AuthController {
  public login = (req: Request, res: Response) => {
    res.send(`
      <form action="/auth/login-credentials" method="POST">
        <div>
          <label for="mail">Email</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <a href='/auth/google'>Login with Google</a>
    `);
  };

  public loginWithCredentials = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Verificar que los campos estén presentes
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    try {
      // Buscar al usuario en la base de datos
      const user = await prisma.user.findFirst({
        where: { mail: email },
      });

      if (!user) {
        return res.status(401).send("Invalid email or password");
      }

      // Comparar la contraseña proporcionada con la contraseña cifrada en la base de datos
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send("Invalid password");
      }

      // Si las credenciales son correctas, iniciar sesión y guardar al usuario en la sesión
      req.login(user, (err) => {
        if (err) {
          return res.status(500).send("Error during login");
        }

        // Redirigir al perfil si todo es correcto
        return res.redirect("/profile");
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server error");
    }
  };

  public loginCallback = async (req: Request, res: Response) => {
    try {
      // Buscar al usuario en la base de datos
      const user = await prisma.user.findUnique({
        where: { mail: (req.user as any).email },
      });

      if (!user) {
        return res.status(401).send("User not found");
      }

      // Modificar el objeto usuario para obtener el rol del usuario
      req.user = {
        ...req.user,
        role: user?.role,
      };

      // Si las credenciales son correctas, iniciar sesión y guardar al usuario en la sesión
      req.login(req.user, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error during login");
        }

        // Redirigir al perfil si todo es correcto
        return res.redirect("/auth/profile"); // Cambiado a /auth/profile
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server error");
    }
  };

  public profile = (req: Request, res: Response) => {
    res.send(
      `Welcome ${
        req.user && (req.user as any).displayName
          ? (req.user as any).displayName
          : (req.user as any).names
      }`
    );
  };

  public logout = (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        console.error(err);
      }

      // Eliminar la cookie manualmente
      res.clearCookie("connect.sid"); // 'connect.sid' es el nombre predeterminado de la cookie de sesión de Express.
      res.redirect("/login"); // Redirige a la página de login
    });
  };
}
