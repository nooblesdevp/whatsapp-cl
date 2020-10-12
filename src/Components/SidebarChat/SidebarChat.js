import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";

import "./SidebarChat.scss";
import db from "../../firebase/firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      //get data chat for last seen in sidebarchat
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  // for random avatar
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  //function add room name
  const createChat = () => {
    const roomName = prompt("please enter name for chat room");

    if (roomName) {
      //do some clever database stuff
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  // sett max character they get
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + " .." : str;
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{truncate(messages[0]?.message, 40)} </p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
