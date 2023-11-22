import React, { useState } from "react";

import { makeStyles } from "@mui/styles";
import { Button, CircularProgress, TextField } from "@mui/material";

import Backdrop from "../../assets/bg.png";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    margin: 5,
    borderRadius: 20,
    border: "1px solid black",
    padding: 10,

    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: 10,
    alignItems: "center",
    justifyContent: "center",

    width: "60vw",
    height: "60vh",

    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  form: {
    display: "flex",
    width: "70%",
    flexDirection: "column",
    justifyContent: "center",
    gap: 20,
  },
  img: {
    width: "100%",
    borderRadius: 15,
    height: "100%",
  },
}));

const Login = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  const [userId, setUserId] = useState(localStorage.getItem("user_id") || "");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const SESSION_ID = "deeddc9b-e51e-41bd-9791-7ac88d02f2a9";

  const handleInputUserId = (e) => {
    setError(null);
    setUserId(parseInt(e.target.value));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.setItem("user_id", userId);

    setIsLoading(true);

    // const { data } = await axios.post(
    //   process.env.REACT_APP_SERVER_URL + "/auth/login",
    //   {
    //     id: userId,
    //   }
    // );

    // if (data.status === 200) {
    //   navigate(`/chat/${data.sessionId}`);
    // } else if (data.status === 404) {
    //   setError(data.messages);
    // }

    navigate(`/chat/${SESSION_ID}`);

    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "none",
        }}
      >
        <form onSubmit={handleLogin} className={styles.form}>
          <TextField
            variant="outlined"
            label="Username"
            value={userId}
            onChange={handleInputUserId}
            helperText={error}
            error={error !== null}
          />

          <TextField
            variant="outlined"
            label="Password"
            value={userId}
            onChange={handleInputUserId}
            helperText={error}
            error={error !== null}
          />

          <Button type="submit" variant="contained" color="primary">
            {isLoading ? (
              <CircularProgress
                sx={{
                  color: "#c4c4c4",
                }}
              />
            ) : (
              <>Login</>
            )}
          </Button>
        </form>
      </div>
      <img alt="" src={Backdrop} className={styles.img} />
    </div>
  );
};

export default Login;
