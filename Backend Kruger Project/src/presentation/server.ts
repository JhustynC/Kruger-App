import express, { Router } from "express";
import path from "path";
import * as http from "http";
import compression from "compression";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { envs } from "../config/plugins/envs.plugin";

export interface Options {
  port: number;
  routes: Router;
  publicPath?: string;
}

export class Server {
  private readonly app = express();
  private http?: http.Server;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly router: Router;

  constructor(options: Options) {
    const { port, publicPath, routes: router } = options;
    this.port = port;
    this.publicPath = publicPath || "public";
    this.router = router;
  }

  public get invoke(): express.Application {
    return this.app;
  }

  async start() {
    //* Middlewares esenciales
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(morgan("dev"));

    //* Configuración de sesiones
    this.app.use(
      session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
      })
    );

    //* Configuración de Passport
    passport.use(
      new GoogleStrategy(
        {
          clientID: envs.GOOGLE_CLIENT_ID || "",
          clientSecret: envs.GOOGLE_CLIENT_SECRET || "",
          callbackURL: "http://localhost:3000/auth/google/callback",
        },
        (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: (err: any, user?: any) => void
        ) => {
          console.log(profile);
          return done(null, profile);
        }
      )
    );

    passport.serializeUser((user: any, done) => done(null, user));
    passport.deserializeUser((user: any, done) => done(null, user));

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    //* Rutas de la API
    this.app.use(this.router);

    //* Carpeta pública
    // this.app.use(express.static(this.publicPath));

    //* Rutas para SPA
    // this.app.get("*", (req, res) => {
    //   const indexPath = path.join(
    //     __dirname,
    //     `../../${this.publicPath}/index.html`
    //   );
    //   res.sendFile(indexPath);
    // });

    //* Middleware de manejo de errores
    // this.app.use(
    //   (
    //     err: any,
    //     req: express.Request,
    //     res: express.Response,
    //     next: express.NextFunction
    //   ) => {
    //     console.error(err.stack);
    //     res
    //       .status(err.status || 500)
    //       .json({ error: err.message || "Internal Server Error" });
    //   }
    // );

    //* Inicia el servidor
    this.http = this.app.listen(this.port, () => {
      console.log(`Server is running on port http://localhost:${this.port}`);
    });
  }

  public stop = async (): Promise<void> => {
    try {
      console.log("Closing server...");
      await this.http?.close();
      console.log("Server closed.");
    } catch (error) {
      console.error("Error closing server:", error);
    }
  };
}
