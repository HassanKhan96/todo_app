import { NextFunction, Request, Response } from "express";
import * as AuthServices from "../services/auth.service";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken, ...userData } = await AuthServices.RegisterUser(
      req.body
    );

    res.cookie("refreshToken", refreshToken, {
      maxAge: 86_400_000,
      httpOnly: true,
    });
    res.status(201).send(userData);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken, ...userData } = await AuthServices.LoginUser(
      req.body
    );
    res.cookie("refreshToken", refreshToken, {
      maxAge: 86_400_000,
      httpOnly: true,
    });
    res.status(200).send(userData);
  } catch (error) {
    next(error);
  }
};
