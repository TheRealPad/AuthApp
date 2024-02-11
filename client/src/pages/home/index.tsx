import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, Checkbox, FormControlLabel } from "@mui/material";

import { TopBar } from "../../components/topBar";
import { User } from "../../dto";
import styles from "./styles.module.scss";

function Home() {
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [user, setUser] = useState<User | null>(null);
  const [stayConnected, setStayConnected] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      setAccessToken(codeResponse.access_token);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (accessToken) {
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
          setUser(res.data);
        })
        .catch((err) => console.log(err));
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
