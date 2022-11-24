import { Application, Request, Response } from "express";
import * as UserController from "../../controllers/user.controller";
import { RoutesConfig } from "../common/common.routes.config";

export class UserRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, "users");
  }

  configureRoutes(): Application {
    this.app
      .route("/users")
      .get(UserController.getUsers)
      .post((req: Request, res: Response) =>
        UserController.createUser(req, res)
      );

    this.app
      .route("/users/:userId")
      .get((req: Request, res: Response) =>
        UserController.getUserById(req, res)
      )
      .patch((req: Request, res: Response) =>
        UserController.updateUser(req, res)
      )
      .delete((req: Request, res: Response) =>
        UserController.deleteUser(req, res)
      );
    return this.app;
  }
}
