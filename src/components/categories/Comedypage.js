import React from "react";
import { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar";
import { auth, db } from "../firebase";
import Modal from "@material-ui/core/Modal";
import { Button, makeStyles, Input } from "@material-ui/core";

import CatePost from "./CatePost";
import { Link } from "react-router-dom";
import "./Comedy.css";
import "./categories.css";
function Comedypage() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [countResults, setCountResults] = useState("");

  // Signup
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

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    setSearchResults(
      posts.filter((val) => {
        return val.post.caption.toLowerCase().includes(search.toLowerCase());
        //   val.post.username.toLowerCase().includes(search.toLowerCase())
      })
    );

    countResultsFunc();
  }, [search, posts]);

  const countResultsFunc = () => {
    setCountResults(searchResults.length);
  };

  console.log(searchResults);
  console.log(user);

  return (
    <div>
      <Navbar />
      <section class="homeD" id="home">
        <input
          type="text"
          id="searchBar"
          class="searchBar"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <p className="resluts">
          {countResults < 0 || search == "" ? (
            <p></p>
          ) : (
            <p>{countResults}results</p>
          )}
        </p>
      </section>

      <section class="home2" id="home">
        <div className="comedy cate">
          <Link href={`/home`}>back</Link>
        </div>
        <div className="series cate">
          <Link href={`/series`}>Series</Link>
        </div>

        <div className="series cate">
          <Link href={`/adventure`}>Adventure</Link>
        </div>

        <div className="series cate">
          <Link href={`/nollywood`}>Nollywood</Link>
        </div>

        <div className="series cate">
          <Link href={`/superhero`}>SuperHero Movies</Link>
        </div>

        <div className="horror cate">
          <Link href={`/horror`}>Horror</Link>
        </div>

        <div className="animated cate">
          <Link href={`/animations`}>Animations</Link>
        </div>

        <div className="action cate">
          <Link href={`/action`}>Action</Link>
        </div>

        <div className="comedy cate">
          <Link href={`/comedy`}>Comedy</Link>
        </div>
   
      </section>

      <div className="rowH">
        <h2 className="h2categoryH">Comedy Movies</h2>
        <section className="imagesH" id="images">
          {searchResults
            .filter((post) => {
              if (post.post.category === "Comedy") {
                return post;
              }
            })
            .map(({ id, post }) => (
              <CatePost
                key={id}
                postId={id}
                user={user}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
                category={post.category}
                link1={post.link1}
                // download={()=>download(post)}
              />
            ))}
        </section>
      </div>
    </div>
  );
}

export default Comedypage;
