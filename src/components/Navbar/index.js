import React from "react";

import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Logo from "../../assets/bg.png";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  navbar: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f8f9fa!important",
  },
  container: {
    width: "60%",
    padding: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  img: {
    width: 80,
    height: 80,
  },
}));

const Navbar = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 15,
            alignItems: "center",
          }}
        >
          <img alt="logo" src={Logo} className={styles.img} />
          <div
            style={{
              color: "#011f4b",
            }}
          >
            <h2>Tatinta</h2>
            <p>Your AI-enabled organization design co-pilot</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            color="error"
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
