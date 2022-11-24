import { Application, Request, Response } from "express";
import { UserController } from "../../controllers/user.controller";
import { RoutesConfig } from "../common/common.routes.config";

export class UserRoutes extends RoutesConfig {
  userController = new UserController();
  constructor(app: Application) {
    super(app, "users");
  }

  configureRoutes(): Application {
    this.app
      .route("/users")
      .get((req: Request, res: Response) =>
        this.userController.getUsers(req, res)
      )
      .post((req: Request, res: Response) =>
        this.userController.createUser(req, res)
      );

    this.app
      .route("/users/:userId")
      .patch((req: Request, res: Response) =>
        this.userController.updateUser(req, res)
      )
      .delete((req: Request, res: Response) =>
        this.userController.deleteUser(req, res)
      );
    return this.app;
  }
}
