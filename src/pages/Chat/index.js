import React, { useEffect, useRef, useState } from "react";

import { IconButton, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

import SendIcon from "@mui/icons-material/Send";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CloseIcon from "@mui/icons-material/Close";

import Message from "../../components/Message";
import axios from "axios";

const useStyles = makeStyles(() => ({
  container: {
    width: "24rem",
    height: "32rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "#f4f4f4",
  },

  box: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: 5,
    overflowY: "hidden",
    borderRadius: 0,
    borderBottomColor: "transparent",
    backgroundColor: "inherit",
    borderColor: "#318fb5",
  },
}));

const ChatBox = ({ children }) => {
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
    if (conversation.length || isLoading) {
      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [conversation.length, isLoading]);

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
      {children}
      <div className={styles.box}>
        <div
          style={{
            overflowY: "scroll",
            border: "none",
            overflowX: "visible",
            padding: 10,
            backgroundColor: "inherit",
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
          border: "1px solid #318fb5",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <TextField
          value={prompt}
          placeholder="Ask me"
          onChange={(e) => setPrompt(e.target.value)}
          fullWidth
          focused
          sx={{
            input: {
              color: "#2d3552",
              backgroundColor: "white",
              height: "inherit",
            },
          }}
          disabled={isLoading}
        />
        <IconButton style={{ color: "#318fb5" }}>
          <SendIcon color="inherit" />
        </IconButton>
      </form>
    </div>
  );
};

const Chat = () => {
  const [active, setActive] = useState(true);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        border: "none",
        gap: "1rem",
      }}
    >
      {active && (
        <ChatBox>
          <div
            style={{
              backgroundColor: "#2d3552",
              color: "#f6f6f6",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              padding: "8px 16px",
              fontWeight: "bold",
              border: "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Tantinta
            <IconButton
              size="small"
              onClick={() => {
                setActive(false);
              }}
            >
              <CloseIcon color="info" />
            </IconButton>
          </div>
        </ChatBox>
      )}
      <IconButton
        onClick={() => {
          setActive(true);
        }}
        size="large"
        color="info"
      >
        <QuestionAnswerIcon />
      </IconButton>
    </div>
  );
};

export default Chat;
