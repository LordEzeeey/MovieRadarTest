import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./Upload.css";
import firebase from "firebase";
import { db, storage, auth } from "./firebase";
import placeholder from "./video/mega.mp4";

function Upload() {
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");
  const [imageSize, setImageSize] = useState("");
  const [description, setDescription] = useState("");
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");
  const [SideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  console.log(category)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in ...
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          //dont update username
        } else {
          //if we just created someone...
          return authUser.updateProfile({
            displayName: username,
          });
        }
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

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const upLoadTask = storage.ref(`images/${image.name}`).put(image);

    upLoadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //Error function ...
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              category: category,
              description: description,
              imageSize,
              imageSize,
              link1: link1,
              link2: link2,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImageSize("");
            setDescription("");
            setLink1("");
            setLink2("");
            setCategory("");
            setImage(null);
          });
      }
    );
  };
  return (
    <div>
      <Navbar />

      <div className="uploadWrapper">
        <div className="uploadimageWrapper">
          <div className="uploadBox">
            <video autoPlay loop muted className="uploadimageBox">
              <source src={placeholder} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="uploadContent">
          {user?.displayName || user?.email ? (
            <div className="uploadContent-inner">
              <progress
                className="imageupload__progress"
                value={progress}
                max="100"
              />
              <input
                type="file"
                placeholder="Movie thumbnail"
                onChange={handleChange}
                placeholder="Select image"
                required
              />
              <input
                className="inputText"
                type="text"
                placeholder="Movie Name"
                onChange={(event) => setCaption(event.target.value)}
                value={caption}
                required
              />

              <select
              className="select"
              onChange={(event) => setCategory(event.target.value)}
              required
              >
              <option selected disabled >Choose Movie category</option>
              <option value="Series">Serie</option>
              <option value="Action">Action</option>
              <option value="Animated">Animated</option>
              <option value="Comedy">Comedy</option>
              <option value="horror">Horror</option>
              <option value="Nollywood">Nollywood</option>
              <option value="Adventure">Adventure</option>
              <option value="SuperHero">Super Hero</option>
              </select>

            
              <input
                className="inputText"
                type="text"
                placeholder="Movie description"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
                required
              />
              <input
                className="inputText"
                type="text"
                placeholder="Link to movie, uploaded to mega/any other similar website"
                onChange={(event) => setLink1(event.target.value)}
                value={link1}
              />
            
              <button onClick={handleUpload}>Upload</button>
            </div>
          ) : (
            <h3 className="sorryMeso">Sorry, you need to <span><a href={`/login`}>Login</a></span>/<span><a href={`/signin`}>Signin</a></span> to Upload</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default Upload;
