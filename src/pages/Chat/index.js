import React, { useEffect, useRef, useState } from "react";

import { Button, IconButton, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

import axios from "axios";
// import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";
import remarkGfm from "remark-gfm";
import SendIcon from "@mui/icons-material/Send";

import Emoji from "react-emoji-render";

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

  promptText: {
    padding: 10,
    backgroundColor: "#374151",
    color: "#FFFFFF",
    width: "fit-content",
    borderRadius: 15,
    alignSelf: "flex-end",
    maxWidth: "70%",
  },

  responseText: {
    backgroundColor: "rgb(17, 24, 39)",
    color: "rgb(243, 244, 246)",
    padding: 10,
    width: "fit-content",
    overflowWrap: "break-word",
    borderRadius: 15,
    maxWidth: "70%",
  },

  box: {
    borderColor: "orange",
    height: "100%",
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 10,
    gap: 10,
    overflowY: "scroll",
  },
}));

const REACT_APP_SERVER_URL = "http://selab.nhtlongcs.com:20503";

const Chat = () => {
  const styles = useStyles();
  const { pathname } = useLocation();

  const session = pathname.split("/")[2];

  const [conversation, setConversation] = useState([
    { source: "chatbot", message: "Hello, world! :)" },
    { source: "chatbot", message: "check" },
    { source: "user", message: "Hi again" },
    { source: "chatbot", message: "Hello, world!" },
    { source: "chatbot", message: "check" },
    { source: "user", message: "Hi again" },
    { source: "chatbot", message: "Hello, world!" },
    { source: "chatbot", message: "check" },
    { source: "user", message: "Hi again" },
    { source: "chatbot", message: "Hello, world!" },
    { source: "chatbot", message: "check" },
    { source: "user", message: "Hi again" },
    { source: "chatbot", message: "Hello, world!" },
    { source: "chatbot", message: "check" },
    { source: "user", message: "Hi again" },
    { source: "chatbot", message: "Hello, world!" },
    { source: "chatbot", message: "check" },
    { source: "user", message: "Hi again :)" },
  ]);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const bottomRef = useRef(null);

  const handleSendPrompt = async (e) => {
    e.preventDefault();

    const _dumpConversation = [{ source: "user", message: prompt }];

    setIsLoading(true);
    setPrompt("");

    const { data } = await axios.post(`${REACT_APP_SERVER_URL}/api/v1/chat`, {
      conversation_id: session,
      msg: prompt,
    });

    console.log(data);

    const _dump = [
      ..._dumpConversation,
      { source: "chatbot", message: data.response },
    ];

    setConversation((prev) => [...prev, ..._dump]);

    setIsLoading(false);
  };

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  useEffect(() => {
    const fetchConversation = async () => {
      const { data } = await axios.post(
        REACT_APP_SERVER_URL + "/api/v1/private/conv?conversation_id=" + session
      );

      console.log(data);
    };
    fetchConversation();
  }, []);

  const renderMessage = (msg) => {
    console.log(msg);

    if (msg.source === "chatbot") {
      return <Emoji className={styles.responseText}>{msg.message}</Emoji>;
    }

    if (msg.source === "user") {
      return <Emoji className={styles.promptText}>{msg.message}</Emoji>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {conversation.map((msg) => renderMessage(msg))}
        {isLoading && <div className="loading">...</div>}
        <div ref={bottomRef}></div>
      </div>
      <form
        onSubmit={handleSendPrompt}
        style={{
          display: "grid",
          gridTemplateColumns: "auto 60px",
          columnGap: 20,
          padding: 20,
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
        />
        <IconButton>
          <SendIcon color="warning" />
        </IconButton>
        {/* <Button type="submit" variant="contained">
          Send
        </Button> */}
      </form>
    </div>
  );
};

export default Chat;
