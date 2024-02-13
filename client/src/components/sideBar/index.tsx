import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { googleLogout } from "@react-oauth/google";

import { Cookies } from "@utils/cookies.ts";
import { Props } from "./types.ts";
import styles from "./styles.module.scss";

function SideBar({ setUser }: Props) {
  const logOut = () => {
    googleLogout();
    Cookies.deleteCookie(Cookies.AUTH_COOKIE_NAME);
    setUser(null);
  };

  return (
    <div className={styles.sideBar}>
      <Button startIcon={<LogoutIcon />} onClick={logOut}>
        Log out
      </Button>
    </div>
  );
}

export { SideBar };
