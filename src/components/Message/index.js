import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Emoji from "react-emoji-render";
import { IconButton } from "@mui/material";
import MoodIcon from "@mui/icons-material/Mood";
import FavoriteIcon from "@mui/icons-material/Favorite";
const useStyle = makeStyles(() => ({
  promptText: {
    padding: 10,
    backgroundColor: "#374151",
    color: "#FFFFFF",
    width: "fit-content",
    borderRadius: 15,
    maxWidth: "70%",
    position: "relative",
    marginBottom: 10,
  },

  responseText: {
    backgroundColor: "rgb(17, 24, 39)",
    color: "rgb(243, 244, 246)",
    padding: 10,
    width: "fit-content",
    overflowWrap: "break-word",
    borderRadius: 15,
    maxWidth: "70%",
    position: "relative",
  },

  box: {
    display: "flex",
    flexDirection: "row",
    border: "none",
    width: "100%",
    position: "relative",
  },
}));

const useHover = () => {
  const ref = useRef(null);
  const [isHover, setIsHover] = useState(false);

  const handleMouseMove = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return {
    isHover,
    handleMouseMove,
    handleMouseLeave,
  };
};

const ButtonReact = () => {
  return (
    <div
      style={{
        marginLeft: 5,
        marginRight: 5,
        border: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton>
        <MoodIcon />
      </IconButton>
    </div>
  );
};

const ResponseMessage = ({ content }) => {
  const styles = useStyle();
  const { isHover, handleMouseLeave, handleMouseMove } = useHover();
  const [isReactionActive, setIsReactionActive] = useState(true);

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current.getBoundingClientRect());
    }
  }, []);

  return (
    <div
      className={styles.box}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={styles.responseText}
        ref={ref}
        style={
          isReactionActive
            ? {
                marginBottom: 10,
              }
            : {}
        }
      >
        {content}
        {isReactionActive && (
          <div
            style={{
              position: "absolute",
              right: -10,
              bottom: -20,
              border: "none",
            }}
          >
            <FavoriteIcon />
          </div>
        )}
      </div>
      {isHover && <ButtonReact />}
    </div>
  );
};

const PromptMessage = ({ content }) => {
  const styles = useStyle();
  const { isHover, handleMouseLeave, handleMouseMove } = useHover();

  return (
    <div
      className={styles.box}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        justifyContent: "flex-end",
      }}
    >
      {isHover && <ButtonReact />}
      <div className={styles.promptText}>
        {content}
        <div
          style={{
            position: "absolute",
            right: -10,
            bottom: -20,
            border: "none",
          }}
        >
          <FavoriteIcon />
        </div>
      </div>
    </div>
  );
};

const Message = ({ role, content }) => {
  return (
    <>
      {role === "human" && <PromptMessage content={content} />}
      {role === "tatinta" && <ResponseMessage content={content} />}
    </>
  );
};

export default Message;
