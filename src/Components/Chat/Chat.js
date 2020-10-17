import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase";
//icons
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";

import "./Chat.scss";
import db from "../../firebase/firebase";
import { useStateValue } from "../StateProvider/StateProvider";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([""]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      //get rooms chat information for sidebarChat
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
      //get messages user and timestamp for chat body
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  // for random avatar
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  //function sendMessage input
  const sendMessage = (e) => {
    e.preventDefault(); //--> stop refresing  page
    console.log("yooo", input);
    //get chat message and send to db
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // console.log('called')
  };

  useEffect(() => {
    scrollToBottom();
    //   scrl= document.getElementById("chat__box")
    //  console.log(messagesEndRef.current.clientHeight);
    //  scrl.scrollIntoView(false);
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat__header">
        <IconButton>
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        </IconButton>
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last Seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <div className="chat__messages">
            <p
              className={`chat__message ${
                message.name === user.displayName && "chat__reciver"
              }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toString()}
              </span>
            </p>
          </div>
        ))}
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <form action="">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
