import express, { Router } from "express";
import path from "path";
import * as http from "http";
import compression from "compression";

export interface Options {
  port: number;
  routes: Router;
  publicPath?: string;
}

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
    //* Middleware
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); //x-www-form-urlencoded
    this.app.use(compression()); // compression of responses

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //*Routes
    this.app.use(this.router);

    //* Serve Index.html for all routes
    //*Help the SPA routers
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname,
        `../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
      return;
    });

    this.http = this.app.listen(this.port, () => {
      console.log(`Server is running on port http://localhost:${this.port}`);
    });
  }

  public stop = async (): Promise<void> => {
    await this.http?.close();
  };
}
