import { Request, Response } from "express";
import * as UserServices from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
  const result = await UserServices.getUsers();
  return res.status(200).send(result);
};

export const getUserById = async (req: Request, res: Response) => {
  const result = await UserServices.getUserById(+req.params.userId);
  return res.status(200).send(result);
};

export const createUser = async (req: Request, res: Response) => {
  const result = await UserServices.createUser(req.body);
  return res.status(201).send(result);
};

export const updateUser = async (req: Request, res: Response) => {
  const result = await UserServices.updateUser(+req.params.userId, req.body);
  return res.status(201).send(result);
};

export const deleteUser = async (req: Request, res: Response) => {
  const result = await UserServices.deleteUser(+req.params.userId);
  return res.status(200).send(result);
};
