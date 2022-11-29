import { pool } from "../config/db.config";
import { UserDto } from "../interface/create.user.dto";
import { NotFoundError } from "../utils/error";

export const createUser = async (userDto: UserDto) => {
  try {
    const user = await pool.query(
      "INSERT INTO users (name, email, password, avatar) VALUES ($1, $2, $3, $4) RETURNING *",
      [userDto.name, userDto.email, userDto.password, userDto.avatar]
    );

    return user.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const users = await pool.query("SELECT * FROM users");
    return users.rows;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (id: Number) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (user.rowCount === 0) {
      throw new NotFoundError("user not found");
    }
    return user.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id: Number, update: UserDto) => {
  try {
    const newUser = await pool.query(
      "UPDATE users SET name=$1, email=$2, password=$3, avatar=$4 WHERE id=$5",
      [update.name, update.email, update.password, update.avatar, id]
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id: Number) => {
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return result;
  } catch (error) {
    console.log(error);
  }
};
