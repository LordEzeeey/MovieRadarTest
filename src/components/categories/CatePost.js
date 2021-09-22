import React, { useState, useEffect } from "react";
import "./CatePost.css";
import { db, storage } from "../firebase";
import firebase from "firebase";

function CatePost({
  link1,
  category,
  postId,
  user,
  username,
  caption,
  imageUrl,
}) {
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
  };

  return (
    <div>
      <a className="link-wrapCate" href={link1}>
        <img
          src={imageUrl}
          alt={caption}
          className="row_posterCate  originalCate"
        />
      </a>
    </div>
  );
}

export default CatePost;
