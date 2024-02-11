import { Express } from "express";

import { GoogleController } from "./google";

const mountControllers = (app: Express) => {
  app.use("/", new GoogleController().router);
};

export { mountControllers };
