import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { auth } from "./firebase";
import "./Landingpage.css";
import Navbar from "./Navbar";

function Landingpage() {
  const [open, setOpen] = useState(false);
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

  return (
    <div>

        <div>
          <Navbar />
          <section className="landing-wrap">
            <div className="landText">
              <div className="textR">
                 <h2>WELCOME TO VMOVIES, FEEL AT HOME</h2>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                  veniam possimus nihil delectus iusto illo, odio voluptatem distinctio,
                   perferendis voluptatibus dolorem commodi exercitationem?
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                  veniam possimus nihil delectus iusto illo, odio voluptatem distinctio,
                   perferendis voluptatibus dolorem commodi exercitationem?
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                  veniam possimus nihil delectus iusto illo, odio voluptatem distinctio,
                   perferendis voluptatibus dolorem commodi exercitationem?
                 </p>

                 <button><a href={ `/signin`}>Get Started</a></button>
              </div>
            </div>

            <div className="landImage">
            <div className="textI">
               <h2>WELCOME TO VMOVIES, FEEL AT HOME</h2>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                veniam possimus nihil delectus iusto illo, odio voluptatem distinctio,
                 perferendis voluptatibus dolorem commodi exercitationem?
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                veniam possimus nihil delectus iusto illo, odio voluptatem distinctio,
                 perferendis voluptatibus dolorem commodi exercitationem?
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                veniam possimus nihil delectus iusto illo, odio voluptatem distinctio,
                 perferendis voluptatibus dolorem commodi exercitationem?
               </p>

               <button><a href={ `/signin`}>Get Started</a></button>
            </div>
            </div>
          </section>
        </div>
    </div>
  );
}

export default Landingpage;
