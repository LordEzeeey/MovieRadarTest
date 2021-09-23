import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Home.css";
import Navbar from "./Navbar";
import image from "./images/alovera.png";

import { auth, db } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { Button, makeStyles, Input } from "@material-ui/core";

import Post from "./Post";
import { Link } from "react-router-dom";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyle = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Home(props) {
  const classes = useStyle();
  const [modalStyle] = useState(getModalStyle);

  const inputEl = useRef("");

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [countResults, setCountResults] = useState("");

  const [ttt, setTtt] = useState("");

  console.log(ttt);

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

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  };

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

  const categHorror = () => {
    searchResults.filter((post) => {
      if (post.post.category == "horror") {
        return post;
      }
    });
  };

  const categComedy = () => {
    searchResults.filter((post) => {
      if (post.post.category == "Comedy") {
        return post;
      }
    });
  };

  // const [downloadFile, downloaderComponentUI] = useFileDownloader();
  // const download = file => downloadFile(file)
  return (
    <div>
      <Navbar signup="Signup" login="Login" />
      <section class="home" id="home">
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

      {ttt.length === 1 ? (
        ""
      ) : (
        <div className="row">
          <h2 className="h2category">Animated Movies</h2>
          <section className="images" id="images">
            {searchResults
              .filter((post) => {
                if (post.post.category == "Animated") {
                  return post;
                }
              })
              .map(({ id, post }) => (
                <Post
                  key={id}
                  postId={id}
                  user={user}
                  username={post.username}
                  caption={post.caption}
                  imageUrl={post.imageUrl}
                  category={post.category}
                  // download={()=>download(post)}
                />
              ))}
          </section>
        </div>
      )}

      <div className="row">
        <h2 className="h2category">Horror Movies</h2>
        <section className="images" id="images">
          {searchResults
            .filter((post) => {
              if (post.post.category == "horror") {
                return post;
              }
            })
            .map(({ id, post }) => (
              <Post
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

      <div className="row">
        <h2 className="h2category">Action Movies</h2>

        <section className="images" id="images">
          {searchResults
            .filter((post) => {
              if (post.post.category == "Action") {
                return post;
              }
            })
            .map(({ id, post }) => (
              <Post
                key={id}
                postId={id}
                user={user}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
                category={post.category}
                // download={()=>download(post)}
              />
            ))}
        </section>
      </div>

      <div className="row">
        <h2 className="h2category">Series</h2>
        <section className="images" id="images">
          {searchResults
            .filter((post) => {
              if (post.post.category == "Serie") {
                return post;
              }
            })
            .map(({ id, post }) => (
              <Post
                key={id}
                postId={id}
                user={user}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
                category={post.category}
                // download={()=>download(post)}
              />
            ))}
        </section>
      </div>

      <div className="row">
        <h2 className="h2category">Comedy Movies</h2>
        <section className="images" id="images">
          {searchResults
            .filter((post) => {
              if (post.post.category == "Comedy") {
                return post;
              }
            })
            .map(({ id, post }) => (
              <Post
                key={id}
                postId={id}
                user={user}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
                category={post.category}
                // download={()=>download(post)}
              />
            ))}
        </section>
      </div>
    </div>
  );
}

export default Home;
