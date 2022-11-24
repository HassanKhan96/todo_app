import { Request, Response } from "express";
import * as UserServices from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
  return res.status(200).send("this route returns all users");
};

export const getUserById = async (req: Request, res: Response) => {
  return res.status(200).send(`this route returns ${req.params.userId} user`);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await UserServices.createUser(req.body);
  return res.status(201).send(user);
};

export const updateUser = (req: Request, res: Response) => {
  return res.status(201).send(`this route updates ${req.params.userId} user`);
};

export const deleteUser = (req: Request, res: Response) => {
  return res.status(200).send(`this route deletes ${req.params.users} user`);
};
