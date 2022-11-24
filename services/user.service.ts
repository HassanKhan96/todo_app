import { Pool } from "pg";
import { pool } from "../config/db.config";

export const createUser = async (userDto: {
  name: string;
  email: string;
  password: string;
  avatar: string | null;
}) => {
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
