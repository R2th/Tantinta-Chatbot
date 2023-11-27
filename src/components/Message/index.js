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
    backgroundColor: "#2d3552",
    color: "#f6f6f6",
    width: "fit-content",
    borderRadius: 15,
    maxWidth: "80%",
    position: "relative",
    marginBottom: 10,
    marginTop: 5,
  },

  responseText: {
    backgroundColor: "#fff",
    color: "#2d3552",
    padding: 10,
    width: "fit-content",
    overflowWrap: "break-word",
    borderRadius: 15,
    maxWidth: "80%",
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
      style={{
        backgroundColor: "inherit",
      }}
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
              color: "#FF6961",
            }}
            onClick={() => {
              setIsReactionActive((prev) => !prev);
            }}
          >
            {isReactionActive ? (
              <FavoriteIcon className="icon-active" />
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
        backgroundColor: "inherit",
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
              color: "#FF6961",
            }}
            onClick={() => {
              setIsReactionActive((prev) => !prev);
            }}
            ref={ref}
          >
            {isReactionActive ? (
              <FavoriteIcon className="icon-active" />
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
