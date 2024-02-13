import axios from "axios";

import { Cookies } from "@utils/cookies.ts";
import { User } from "@dto";

function retrieveUserData(
  accessToken: string,
  stayConnected: boolean,
  tokenExpiration: number,
  setUser: (user: User) => void
) {
  const data = {
    google_id: accessToken,
  };
  axios
    .post(`http://localhost:8080/google`, data, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((res) => {
      stayConnected &&
        Cookies.setCookie(
          Cookies.AUTH_COOKIE_NAME,
          accessToken,
          tokenExpiration
        );
      setUser(res.data);
    })
    .catch((err) => console.log(err));
}

export { retrieveUserData };
