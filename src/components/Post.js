import React, { useState, useEffect } from "react";
import "./Post.css";
import { db, storage } from "./firebase";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { saveAs } from "file-saver";
import image from "./images/alovera.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Post({link1, category, postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      text: comment,
      username: user.displayName,
    });
    setComment("");
  };

  const download = () => {
    storage
      .ref()
      .getDownloadURL()
      .then(function (url) {
        var link = document.createElement("a");
        if (link.download !== undefined) {
          link.setAttribute("href", url);
          link.setAttribute("target", "_blank");
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      });
    //     console.log(e.target.href);
    //     fetch(e.target.href, {
    //       method: "GET",
    //       headers: {}
    //     })
    //       .then(response => {
    //         response.arrayBuffer().then(function(buffer) {
    //           const url = window.URL.createObjectURL(new Blob([buffer]));
    //           const link = document.createElement("a");
    //           link.href = url;
    //           link.setAttribute("download", imageUrl); //or any other extension
    //           document.body.appendChild(link);
    //           link.click();
    //         });
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
  };

  return (
    <div>
     <a className="link-wrap" href={link1}>
     <img src={imageUrl} alt={caption} className="row_poster  original" />
     </a>
    </div>
  );
}

export default Post;
