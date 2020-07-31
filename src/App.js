import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  IconButton
} from "@material-ui/core";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import Message from "./components/Message/index";

import db from "./utils/firebase";

import "./styles.css";

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // for connecting to our firebase
  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        setMessages(
          snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  // for prompting username
  useEffect(() => {
    //use localstorage
    const localUser = localStorage.getItem("user");
    if (localUser !== null) {
      setUser(localUser);
      setIsLoggedIn(true);
    }
  }, []);

  const sendMessage = event => {
    // send the message
    event.preventDefault();

    // add to firebase
    db.collection("messages").add({
      message: message,
      user: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setMessages([...messages, { message, user }]);

    setMessage("");
  };

  const handleUserJoin = event => {
    event.preventDefault();

    localStorage.setItem("user", user);
    setIsLoggedIn(true);
    alert("Thank You for joining " + user);
  };

  return (
    <div className="App">
      <img
        alt="logo"
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
      />
      <h2>{`Hello ${user}`}</h2>
      {/* input componet */}
      <form>
        {!isLoggedIn ? (
          <FormControl className="app__enterName">
            <InputLabel>Enter your name</InputLabel>
            <Input
              className="app__inputForm"
              value={user}
              onChange={event => setUser(event.target.value)}
            />
            <Button
              className="app__sendIcon"
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleUserJoin}
              disabled={!user}
            >
              Join
            </Button>
          </FormControl>
        ) : (
          <FormControl className="app__form">
            <Input
              className="app__inputForm"
              placeholder="Enter your message ..."
              value={message}
              onChange={event => setMessage(event.target.value)}
            />

            <IconButton
              className="app__sendIcon"
              variant="contained"
              color="primary"
              type="submit"
              onClick={sendMessage}
              disabled={!message}
            >
              <SendIcon />
            </IconButton>
          </FormControl>
        )}
      </form>
      {/* message componet */}
      <FlipMove>
        {messages.map(({ message, id }) => (
          <Message key={id} user={user} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}
