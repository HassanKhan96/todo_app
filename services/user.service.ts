import { pool } from "../config/db.config";
import { UserDto } from "../interface/create.user.dto";
import { InternalServerError, NotFoundError } from "../utils/error";

export const createUser = async (userDto: UserDto) => {
  const user = await pool.query(
    "INSERT INTO users (name, email, password, avatar) VALUES ($1, $2, $3, $4) RETURNING *",
    [userDto.name, userDto.email, userDto.password, userDto.avatar]
  );

  if (user.rowCount === 0) throw new InternalServerError("Cannot create user.");
  return user.rows[0];
};

export const getUsers = async () => {
  const users = await pool.query("SELECT * FROM users");
  return users.rows;
};

export const getUserById = async (id: Number) => {
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  if (user.rowCount === 0) {
    throw new NotFoundError("user not found");
  }
  return user.rows[0];
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
