import { Request, Response } from "express";
import { prisma } from "../../config/data/postgres";
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
      res.status(400).send("Email and password are required");
    }

    try {
      // Buscar al usuario en la base de datos
      const user = await prisma.user.findUnique({
        where: { mail: email },
      });

      if (!user) {
        res.status(401).send("Invalid email or password");
        return;
      }

      // Comparar la contraseña proporcionada con la contraseña cifrada en la base de datos
      // const isMatch = await bcrypt.compare(password, user.password);
      // if (!isMatch) {
      //   return res.status(401).send("Invalid email or password");
      // }

      // Si las credenciales son correctas, iniciar sesión y guardar al usuario en la sesión
      req.login(user, (err) => {
        if (err) {
          res.status(500).send("Error during login");
        }

        // Redirigir al perfil si todo es correcto
        res.redirect("/profile");
      });
    } catch (error) {
      res.status(500).send("Server error");
    }
  };

  public loginCallback = (req: Request, res: Response) => {
    //? Se coloca el /auth/profile ya que la ruta /profile no es accsesible desde
    //? el controlador principal
    res.redirect("/auth/profile"); // Cambiado a /auth/profile
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
