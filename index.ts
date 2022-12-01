import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import * as http from "http";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import debug from "debug";
import { RoutesConfig } from "./routes/common/common.routes.config";
import { UserRoutes } from "./routes/users/userRoutes";
import { BaseError } from "./utils/error";

dotenv.config();

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const routes: Array<RoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((error: BaseError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode).send({
    name: error.name,
    status: error.statusCode,
  });
});

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
// app.get("/", (req: express.Request, res: express.Response) => {
//   console.log(req.body);
//   res.status(200).send(runningMessage);
// });

server.listen(process.env.PORT, () => {
  routes.forEach((route: RoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  console.log(runningMessage);
});
