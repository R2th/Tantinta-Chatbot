import { Button, Rating } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {},
  ratingValue: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    marginLeft: 30,
    marginBottom: 20,
  },
}));

const Rate = ({ setIsRating }) => {
  const styles = useStyles();

  const [satisfied, setSatisfied] = useState(0);
  const [recommend, setRecommend] = useState(0);

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <p>
          On a scale from 0 to 10, how satisfied are you with <b>Tatinta's</b>{" "}
          assistance?"
        </p>
        <div className={styles.ratingValue}>
          <div class="text-left pl-3 pr-1">Completely Dissatisfied</div>
          <Rating
            value={satisfied}
            onChange={(event, newValue) => {
              setSatisfied(newValue);
            }}
          />
          <div class="text-right pl-1 pr-3">Completely Satisfied</div>
        </div>
      </div>
      <div>
        <p>
          On a scale from 0 to 10, how likely are you to recommend{" "}
          <b>Tatinta</b> to a friend or colleague?
        </p>
        <div className={styles.ratingValue}>
          <div class="text-left pl-3 pr-1">Not at all likely</div>
          <Rating
            value={recommend}
            onChange={(event, newValue) => {
              setRecommend(newValue);
            }}
          />
          <div class="text-right pl-1 pr-3">Extremely likely</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <Button
          color="inherit"
          variant="contained"
          onClick={() => {
            setIsRating(false);
          }}
        >
          Back
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            navigate("/auth/login");
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Rate;
