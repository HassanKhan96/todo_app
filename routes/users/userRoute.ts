import { Application, Request, Response } from "express";
import { RoutesConfig } from "../common/common.routes.config";

export class UserRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, "users");
  }

  configureRoutes(): Application {
    this.app
      .route("/users")
      .get((req: Request, res: Response) => {
        return res.status(200).send("this route returns all users");
      })
      .post((req: Request, res: Response) => {
        return res.status(201).send("this route create new user");
      });

    this.app
      .route("/users/:userId")
      .patch((req: Request, res: Response) => {
        return res
          .status(201)
          .send(`this route updates ${req.params.userId} user`);
      })
      .delete((req: Request, res: Response) => {
        return res
          .status(200)
          .send(`this route deletes ${req.params.users} user`);
      });
    return this.app;
  }
}
