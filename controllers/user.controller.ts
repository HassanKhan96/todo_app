import { Request, Response } from "express";
import { Pool } from "pg";
import { connectDb } from "../config/db.config";

export class UserController {
  db: Pool = connectDb();

  async getUsers(req: Request, res: Response) {
    console.log(req.body);
    return res.status(200).send("this route returns all users");
  }

  async createUser(req: Request, res: Response) {
    const user = await this.db.query(
      "INSERT INTO users (name, email, password, avatar) VALUES ($1, $2, $3, $4)",
      [req.body.name, req.body.email, req.body.password, req.body.avatar]
    );
    return res.status(201).send(user);
  }

  updateUser(req: Request, res: Response) {
    return res.status(201).send(`this route updates ${req.params.userId} user`);
  }

  deleteUser(req: Request, res: Response) {
    return res.status(200).send(`this route deletes ${req.params.users} user`);
  }
}
