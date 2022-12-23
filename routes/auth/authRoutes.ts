import { Application } from "express";
import { RoutesConfig } from "../common/common.routes.config";
import { registerUser, loginUser } from "../../controllers/auth.controller";

export class AuthRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, "auth");
  }

  configureRoutes(): Application {
    this.app.route("/auth/login").post(loginUser);

    this.app.route("/auth/register").post(registerUser);

    return this.app;
  }
}
