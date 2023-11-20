import React, { useState } from "react";

import { IconButton, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
import SendIcon from "@mui/icons-material/Send";

import Message from "../../components/Message";

const useStyles = makeStyles(() => ({
  container: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },

  box: {
    borderColor: "orange",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 10,
    gap: 10,
    overflowY: "scroll",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: "transparent",
  },
}));

const REACT_APP_SERVER_URL = "http://selab.nhtlongcs.com:20503";

const Chat = () => {
  const styles = useStyles();

  const [conversation, setConversation] = useState([]);

  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (prompt !== "") {
      setIsLoading(true);

      const newConversation = [
        ...conversation,
        { role: "human", content: prompt, metadata: {} },
      ];

      setPrompt("");
      setConversation(newConversation);

      const { data } = await axios.post(`${REACT_APP_SERVER_URL}/api/v1/chat`, {
        content: [...newConversation],
      });

      setIsLoading(false);

      if (data.content) {
        setConversation(data.content);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {conversation.map((msg) => (
          <Message role={msg.role} content={msg.content} />
        ))}
      </div>
      {isLoading && (
        <div
          style={{
            border: "1px solid orange",
            borderBottom: "none",
            borderTop: "none",
            borderRadius: 0,
            width: "100%",
            padding: 12,
          }}
        >
          <div className="is-typing">
            <div className="jump1"></div>
            <div className="jump2"></div>
            <div className="jump3"></div>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "auto 60px",
          columnGap: 10,
          padding: "8px 16px",
          border: "1px solid orange",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <TextField
          value={prompt}
          placeholder="Ask me"
          onChange={(e) => setPrompt(e.target.value)}
          fullWidth
          color="warning"
          focused
          sx={{
            input: {
              color: "#f3f4f6",
            },
          }}
          disabled={isLoading}
        />
        <IconButton>
          <SendIcon color="warning" />
        </IconButton>
      </form>
    </div>
  );
};

export default Chat;
