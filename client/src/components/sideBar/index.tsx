import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import styles from "./styles.module.scss";
import { Props } from "./types.ts";
import { googleLogout } from "@react-oauth/google";

function SideBar({ setUser }: Props) {
  const logOut = () => {
    googleLogout();
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
