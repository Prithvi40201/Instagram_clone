import React, { useState } from "react";
/* change this  to be like this   import firbase from firebase */
import {
  db,
  storage,
} from "./firebase"; /* change this  to be like this   import {db, storage} from "./firebase  (this firebase should come from the folder u saved the firebase.js*/
import Button from '@material-ui/core/Button';
import firebase from "firebase";
import "./ImageUpload.css"
function Upload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [url, setimageUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },

      () => {
        //complete fuc.....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100" />
      <input
        className="upload__inputcap"
        type="text"
        placeholder="Caption eg: Smart work>=< Hardwork"
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <input
        className="upload__imputfile"
        type="file"
        onChange={handleChange}
      />
      <Button className="upload__inputbutton" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
}

export default Upload;
