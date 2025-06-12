import express, { Express, Request, Response } from "express";
import type { Api } from "../api";

export class ApiIndex implements Api {
  private constructor(readonly app: Express) {}

  public static build() {
    const app = express();
    app.use(express.json());
    return new ApiIndex(app);
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log("Server runing on port " + port);
      this.listRoutes();
    });
  }

  public addGetRoute(
    path: string,
    handler: (req: Request, res: Response) => void
  ): void {
    this.app.get(path, handler);
  }

  public addPostRoute(
    path: string,
    handler: (req: Request, res: Response) => void
  ): void {
    this.app.post(path, handler);
  }

  private listRoutes() {
    const routes = this.app._router.stack
      .filter((route: any) => route.route)
      .map((route: any) => {
        return {
          path: route.route.path,
          method: route.route.stack[0].method,
        };
      });
    console.log(routes);
  }
}