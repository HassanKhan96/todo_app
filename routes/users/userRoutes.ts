import { Application, NextFunction, Request, Response } from "express";
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
      .post(UserController.createUser);

    this.app
      .route("/users/:userId")
      .get(UserController.getUserById)
      .patch(UserController.updateUser)
      .delete(UserController.deleteUser);
    return this.app;
  }
}
