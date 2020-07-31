import React, { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";

import Message from "./components/Message/index";

import "./styles.css";

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { user: "user 1", message: "hello" },
    { user: "user 2", message: "tsap" }
  ]);
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(prompt("Enter your name"));
  }, []);

  const sendMessage = event => {
    // send the message
    event.preventDefault();
    setMessages([...messages, { message, user }]);

    setMessage("");
  };

  return (
    <div className="App">
      <h1>Hello Chat Members</h1>
      <h2>{`Hello ${user}`}</h2>
      {/* input componet */}
      <form>
        <FormControl>
          <InputLabel>Enter your message ...</InputLabel>
          <Input
            value={message}
            onChange={event => setMessage(event.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
            disabled={!message}
          >
            Send
          </Button>
        </FormControl>
      </form>
      {/* message componet */}
      {messages.map(message => (
        <Message user={user} message={message} />
      ))}
    </div>
  );
}
