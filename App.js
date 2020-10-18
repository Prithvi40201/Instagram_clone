import React, { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, Input } from "@material-ui/core";
import ImageUpload from ImageUpload;
import InstagramEmbed from "react-instagram-embed";
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 200,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function App() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [post, setPost] = useState([]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPost(
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
  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      //possibejhfgjhshdsiuhiudhsiuhsdiuhiaushiuai
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };
  return (
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b9a72fd8-232d-4e88-9140-a45d44b896e6/d75kc7p-f5fc3cc2-ee9f-402c-a757-714b536dfc85.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYjlhNzJmZDgtMjMyZC00ZTg4LTkxNDAtYTQ1ZDQ0Yjg5NmU2XC9kNzVrYzdwLWY1ZmMzY2MyLWVlOWYtNDAyYy1hNzU3LTcxNGI1MzZkZmM4NS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.olmtmhHYwTsLtLb19jwmPPMd2rbQsk7a3t8pIxMhDgY"
                alt=""
              />
              <input
                type="text"
                placeholder="Username eg: prith"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
              <input
                type="text"
                placeholder="email eg: prithvi@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="pasword eg:*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={signUp}>SignUp</Button>
            </center>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b9a72fd8-232d-4e88-9140-a45d44b896e6/d75kc7p-f5fc3cc2-ee9f-402c-a757-714b536dfc85.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYjlhNzJmZDgtMjMyZC00ZTg4LTkxNDAtYTQ1ZDQ0Yjg5NmU2XC9kNzVrYzdwLWY1ZmMzY2MyLWVlOWYtNDAyYy1hNzU3LTcxNGI1MzZkZmM4NS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.olmtmhHYwTsLtLb19jwmPPMd2rbQsk7a3t8pIxMhDgY"
                alt=""
              />

              <input
                type="text"
                placeholder="email eg: prithvi@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="pasword eg:*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={signIn}>Sign In</Button>
            </center>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://lh3.googleusercontent.com/4vxmZTYkrwZFUvh65l84m3JTc2nNvAKYRC7BfCbT-vbinq07iXQ_1I7rn2pVxm-tIvTN3b0Oujw9L6WsMK_Beeu1OhL5NsYtqTr8allB4b4IFKx2eWdc0L_s7OFaie_fpO-fQbMoIU1z6oZrsCKm276ePDw9jeZMUvzeC_pL1pBUGOKXb2mq1EkoB-gW0nrBYwRfEzzXP0kthFEvt8EVNh43Nzjstckmg1S-aHfTF4L1s77kudPmtvY1aSxjZuCGrLBUthUWBtRF8VrKoy2otlQH-9rC1sOpK68bb3zd40TiwWjcZCuN-RCRqByvsMtNdUJWEBRXwXvi9Ag3ADW-_mP7OrxdZdRk09t9Ob3R8ckkBYoKq0a_jeKj5I2ooiUrnEimGkQA3ipBHBVS4YTlVBF3xp4kHF8dcgppNcT_vWae_eCzJJzOCZzjfDM7U0jZpBGTqsQJoHuoMiP4zWs8zeOxbQ8PGNAWLXVPVNbUNaQxeYpqrqVbxV0ipIsQM1yUFstEKxSwBS6-IxMn6__b1ZFJsGmiVkW09lR8BPjz6eTWuVi73M2LhpjBat-p7LChck-7Uv_Ak2tWCl_I7GCprulCfC4vmWUV9zTTp0ps8QT7sHbF4nu7rfCe73j9H-sjmO3Y6QCv_W1z8WdZndiKNrOy-HgiTSKb_0DfnFcTpBOFN_aSd_EDV1FtPAwMHg=w860-h471-no?authuser=0"
          alt=""
        />
        {user ? (
          <Button onClick={() => auth.signOut()}>Log Out</Button>
        ) : (
          <dib className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>

            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </dib>
        )}
      </div>
      <div className="app__posts">
        <div className="app__left">
          {post.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
        <div className="app__right">
          <InstagramEmbed
            url="https://www.instagram.com/p/CFHMgBIgMSu/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
          <InstagramEmbed
            url="https://www.instagram.com/p/CE9MzwQAdZa/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>
      {user ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h1>login to upload</h1>
      )}
    </div>
  );
}

export default App;
