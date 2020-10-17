import { Button, IconButton } from "@material-ui/core";
import { Facebook, LinkedIn, Web } from "@material-ui/icons";
import React from "react";
import { auth, provider } from "../../firebase/firebase";
import { actionTypes } from "../reducer/reducer";
import { useStateValue } from "../StateProvider/StateProvider";

import "./Login.scss";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to Whatsapp</h1>
        </div>
        <Button onClick={signIn}>Sign in With Google</Button>
      </div>
      <div className="login__socialLink">
        <IconButton className="login__socialbtn">
          <a
            href="https://web.facebook.com/nuzulzen/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook />
          </a>
        </IconButton>
        <IconButton className="login__socialbtn">
          <a
            href="https://nuzul-zen-alfian.web.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Web />
          </a>
        </IconButton>
        <IconButton className="login__socialbtn">
          <a
            href="https://www.linkedin.com/in/nuzul-zen-alfian-828297184/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn />
          </a>
        </IconButton>
      </div>
    </div>
  );
}

export default Login;
