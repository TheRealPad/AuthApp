import * as express from "express";
import axios from "axios";

import { User } from "../models";

class GoogleController {
  public path = "/google";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.login);
  }

  login = async (req: express.Request, res: express.Response) => {
    const token = req.body.google_id;
    const userInfo = await axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
    const user: User = {
      picture: userInfo.picture,
      email: userInfo.email,
      lastname: userInfo.family_name,
      firstname: userInfo.given_name,
    };
    res.send(user);
  };
}

export { GoogleController };
