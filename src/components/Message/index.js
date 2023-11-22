import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Emoji from "react-emoji-render";
// import { IconButton } from "@mui/material";
// import MoodIcon from "@mui/icons-material/Mood";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

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

// const ButtonReact = ({ onClick }) => {
//   return (
//     <div
//       style={{
//         marginLeft: 5,
//         marginRight: 5,
//         border: "none",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <IconButton onClick={onClick}>
//         <MoodIcon />
//       </IconButton>
//     </div>
//   );
// };

const ResponseMessage = ({ content }) => {
  const styles = useStyle();
  const { isHover, handleMouseLeave, handleMouseMove } = useHover();
  const [isReactionActive, setIsReactionActive] = useState(false);

  const ref = useRef(null);

  return (
    <div
      className={styles.box}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={styles.responseText}
        ref={ref}
        // style={{ marginBottom: 5 }}
      >
        <Emoji>{content}</Emoji>
        {(isReactionActive || isHover) && (
          <div
            style={{
              position: "absolute",
              right: -10,
              bottom: -20,
              border: "none",
              cursor: "pointer",
              zIndex: 10,
            }}
            onClick={() => {
              setIsReactionActive((prev) => !prev);
            }}
          >
            {isReactionActive ? (
              <FavoriteIcon className="icon-active" color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </div>
        )}
      </div>
      {/* {isHover && (
        <ButtonReact
          onClick={() => {
            setIsReactionActive((prev) => !prev);
          }}
        />
      )} */}
    </div>
  );
};

const PromptMessage = ({ content }) => {
  const styles = useStyle();
  const { isHover, handleMouseLeave, handleMouseMove } = useHover();
  const [isReactionActive, setIsReactionActive] = useState(false);
  const ref = useRef();

  useEffect(() => {
    let interval = setInterval(() => {
      setIsReactionActive(true);
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={styles.box}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        justifyContent: "flex-end",
      }}
    >
      {/* {isHover && <ButtonReact />} */}
      <div className={styles.promptText} style={{ marginBottom: 5 }}>
        <Emoji>{content}</Emoji>
        {(isReactionActive || isHover) && (
          <div
            style={{
              position: "absolute",
              right: -10,
              bottom: -20,
              border: "none",
              cursor: "pointer",
              zIndex: 10,
            }}
            onClick={() => {
              setIsReactionActive((prev) => !prev);
            }}
            ref={ref}
          >
            {isReactionActive ? (
              <FavoriteIcon className="icon-active" color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Message = ({ role, content }) => {
  return (
    <>
      {role === "human" && <PromptMessage content={content} />}
      {role === "prev-chat" && <ResponseMessage content={content} />}
    </>
  );
};

export default Message;
