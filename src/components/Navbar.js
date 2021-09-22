import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { auth } from "./firebase";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

function Navbar(props) {
  const [navbar, setNavbar] = useState(false);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [direct, setDirect] = useState(false);

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

  function change() {
    const navbarLinks = document.querySelector("#navLinks");
    navbarLinks.classList.toggle("active");
  }

  function change() {
    const navbarLinks = document.querySelector("#navLinks");
    navbarLinks.classList.toggle("active");
  }

  const changeOnScroll = () => {
    if (window.scrollY > 60) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeOnScroll);

  return (
    <div>
      <nav id="nav" className={navbar ? "nav scrollNav " : " nav "}>
        <h2 className="logo" id="logo">
          <span>Movie</span>Radar
        </h2>

        <a
          href="#"
          id="toggle-button"
          className="toggle-button"
          onClick={change}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>

        <ul className="navLinks" id="navLinks">
        <li>{props.username}</li>
          {user?.displayName || user?.email ? (
            ""
          ) : (
           

              <Link to={`/login`}>
                <li id="li2" className="link" onClick={change}>
                  <a>{props.login}</a>
                </li>
              </Link>
           
          )}


          <ul className="navLinks" id="navLinks">
          {user?.displayName || user?.email ? (
            ""
          ) : (
           
              <Link to={`/signin`}>
                <li id="li1" className="link" onClick={change}>
                  <a>{props.signup}</a>
                </li>
              </Link>
            
          )}

          <li>
            {user?.displayName || user?.email ? (
              <button className="logout" onClick={() => auth.signOut()}>
                Logout
              </button>
            ) : (
              ""
            )}
            </li>
            </ul>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
