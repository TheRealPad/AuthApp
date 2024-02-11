import { Express } from "express";

import { checkGoogleToken } from "./checkGoogleToken";

function mountMiddlewares(app: Express) {
  app.use("/", checkGoogleToken);
}

export { mountMiddlewares };
