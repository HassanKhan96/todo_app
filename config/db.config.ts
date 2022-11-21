import { Pool } from "pg";

export async function pgPool() {
  try {
    const pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "todo_app",
      password: "",
      port: 5432,
    });
    return pool;
  } catch (error) {
    console.log(error);
  }
}
