import React, { useEffect, useRef, useState } from "react";

import { Button, IconButton, TextField } from "@mui/material";
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
    gap: 5,
    overflowY: "hidden",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: "transparent",
  },
}));

const Chat = () => {
  const styles = useStyles();

  const [conversation, setConversation] = useState([]);

  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [prevChat, setPrevChat] = useState([]);

  const scrollRef = useRef(null);

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

      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/chat`,
        {
          content: [
            ...newConversation.filter(
              (conversation) => conversation.role !== "prev-chat"
            ),
          ],
        }
      );

      setIsLoading(false);

      if (data.content) {
        const lastMessage = data.content.slice(-1)[0];

        if (lastMessage.role === "tatinta") {
          // const messages = lastMessage.content
          //   .split(/(?<=[.!?])\s+/)
          //   .map((msg) => ({ role: "prev-chat", content: msg + " :)" }));

          // setPrevChat(messages);
          setPrevChat(
            lastMessage.metadata.sent.map((msg) => ({
              role: "prev-chat",
              content: msg,
            }))
          );

          setConversation((prev) => [...prev, ...data.content.slice(-1)]);
        }
      }
    }
  };

  useEffect(() => {
    if (conversation.length) {
      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [conversation.length]);

  useEffect(() => {
    if (prevChat.length > 0) {
      setIsLoading(true);
      const _dump = prevChat[0];

      const timeInterval = (_dump.content.length / 500) * 60 * 1000;

      let interval = setInterval(() => {
        setConversation((prev) => [...prev, _dump]);
        setPrevChat((prev) => prev.slice(1));
        setIsLoading(false);
      }, timeInterval);

      return () => {
        clearInterval(interval);
      };
    }
  }, [prevChat]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div
          style={{
            overflowY: "scroll",
            border: "none",
            overflowX: "visible",
            padding: 10,
          }}
        >
          {conversation.map((msg, idx) => (
            <Message role={msg.role} content={msg.content} key={idx} />
          ))}
          {isLoading && (
            <div
              style={{
                border: "none",
                width: "100%",
              }}
            >
              <div className="is-typing">
                <div className="jump1"></div>
                <div className="jump2"></div>
                <div className="jump3"></div>
              </div>
            </div>
          )}
          <div
            style={{ border: "none", float: "left", clear: "both" }}
            ref={scrollRef}
          />
        </div>
      </div>

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
