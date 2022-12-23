import { pool } from "../config/db.config";
import { UserDto } from "../interface/users/create.user.dto";
import * as passwordUtils from "../helpers/password.utils";
import {
  ConflictError,
  InternalServerError,
  NotFoundError,
} from "../utils/error";
import { Pool, QueryResult } from "pg";

export const createUser = async (userDto: UserDto) => {
  const userExists = await getUserByEmail(userDto.email);
  if (userExists.rowCount > 0)
    throw new ConflictError("Sorry user already exists");
  userDto.password = await passwordUtils.hashPassword(userDto.password);
  const user = await pool.query(
    "INSERT INTO users (name, email, password, avatar, createdAt, lastLogin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [
      userDto.name,
      userDto.email,
      userDto.password,
      userDto.avatar,
      new Date(),
      new Date(),
    ]
  );

  if (user.rowCount === 0) throw new InternalServerError("Cannot create user.");
  return user;
};

export const getUsers = async () => {
  const users = await pool.query("SELECT * FROM users");
  return users.rows;
};

export const getUserById = async (id: Number) => {
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  if (user.rowCount === 0) throw new NotFoundError("user not found");
  return user.rows[0];
};

export const getUserByEmail = async (email: string): Promise<QueryResult> => {
  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return user;
};

export const updateUser = async (id: Number, update: UserDto) => {
  await getUserById(id);
  const newUser = await pool.query(
    "UPDATE users SET name=$1, email=$2, password=$3, avatar=$4 WHERE id=$5",
    [update.name, update.email, update.password, update.avatar, id]
  );
  if (newUser.rowCount === 0)
    throw new InternalServerError("Cannot create user.");
  return newUser.rows[0];
};

export const deleteUser = async (id: Number) => {
  await getUserById(id);
  const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
  if (result.rowCount === 0)
    throw new InternalServerError("Cannot delete user.");
  return result.rows[0];
};
