import { Pool, Connection, PoolConfig } from "pg";

export const pool: Pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo_app",
  password: "",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});
