import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//component
import "./App.scss";
import Chat from "./Components/Chat/Chat";
import Login from "./Components/Login/Login";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useStateValue } from "./Components/StateProvider/StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
