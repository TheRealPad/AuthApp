import express, { Express } from "express";
import cors from "cors";

import { logger } from "./logger";
import { mountMiddlewares } from "./middlewares";
import { mountControllers } from "./controllers";

class App {
  public app: Express;
  private port = process.env.PORT || 3000;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(logger);
    this.app.use(cors());
    mountMiddlewares(this.app);
    mountControllers(this.app);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        `[server]: Server is running at http://localhost:${this.port}`,
      );
    });
  }
}

export { App };
