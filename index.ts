import express, { Express } from "express";
import dotenv from "dotenv";
import * as http from "http";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import debug from "debug";
import { RoutesConfig } from "./routes/common/common.routes.config";
import { UserRoutes } from "./routes/users/userRoute";
import { Pool } from "pg";

dotenv.config();

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const routes: Array<RoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

app.use(cors());
app.use(express.json());

// const loggerOptions: expressWinston.LoggerOptions = {
//   transports: [new winston.transports.Console()],
//   format: winston.format.combine(
//     winston.format.json(),
//     winston.format.prettyPrint(),
//     winston.format.colorize({ all: true })
//   ),
// };

// if (!process.env.DEBUG) {
//   loggerOptions.meta = false;
// }
// app.use(expressWinston.logger(loggerOptions));

routes.push(new UserRoutes(app));

const runningMessage = `Server running at http://localhost:${process.env.PORT}`;
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});

server.listen(process.env.PORT, () => {
  routes.forEach((route: RoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  console.log(runningMessage);
});
