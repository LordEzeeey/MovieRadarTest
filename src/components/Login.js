import React, { useState, useEffect } from "react";
import "./Login.css";
import signImage2 from "./images/bridge.png";
import { auth } from "./firebase";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

function Login(props) {
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in ...
        console.log(authUser);
        setUser(authUser);
      } else {
        // user has logged out ...
        setUser(null);
      }
    });

    return () => {
      //perform some cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  return (
    <div>
      {user?.displayName || user?.email ? (
        <Redirect to={"/home"} />
      ) : (
        <div className="loginWrapper">
          <div className="loginimageWrapper">
            <div className="loginBox">
              <div className="logo">
                <h4>MovieRadar</h4>
              </div>
              <div className="loginwelcomeText">
                <h1>
                  Creation Starts <br /> Here
                </h1>
                <p className="loginwelcomePara">
                  Access <span>3,137,628</span> free, high-resolution photos you
                  can’t find anywhere else
                </p>
              </div>

              <div className="loginwelcomeFoot">Upload your own images</div>
            </div>
          </div>
          <div className="loginContent">
            <img src={signImage2} alt="" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={signIn}>
              Login
            </button>
            <Link to={`/signin`}>Dont have an Account</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
