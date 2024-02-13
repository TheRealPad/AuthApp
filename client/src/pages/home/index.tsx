import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, Checkbox, FormControlLabel } from "@mui/material";

import { TopBar } from "@components/topBar";
import { User } from "@dto";
import { Cookies } from "@utils/cookies.ts";
import { retrieveUserData } from "@core/googleLogin.ts";
import styles from "./styles.module.scss";

function Home() {
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [user, setUser] = useState<User | null>(null);
  const [stayConnected, setStayConnected] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);
  const token = Cookies.getCookie(Cookies.AUTH_COOKIE_NAME);

  if (token && !accessToken) {
    setAccessToken(token);
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setTokenExpiration(codeResponse.expires_in);
      setAccessToken(codeResponse.access_token);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (accessToken) {
      retrieveUserData(
        accessToken,
        stayConnected,
        tokenExpiration ?? 0,
        setUser
      );
    }
  }, [accessToken]);
  return (
    <div className={styles.home}>
      <TopBar title={"AuthApp"} user={user} setUser={setUser} />
      <div className={styles.content}>
        {user ? (
          <div className={styles.user}>
            <img
              className={styles.picture}
              src={user.picture}
              alt="user image"
              referrerPolicy="no-referrer"
            />
            <h3>User Logged in</h3>
            <p>Firstname: {user.firstname}</p>
            <p>Lastname: {user.lastname}</p>
            <p>Email Address: {user.email}</p>
          </div>
        ) : (
          <div className={styles.connection}>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => login()}
            >
              Sign in with Google
            </Button>
            <FormControlLabel
              control={<Checkbox checked={stayConnected} />}
              label="Stay connected"
              onClick={() => setStayConnected(!stayConnected)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
