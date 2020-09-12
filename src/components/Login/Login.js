import React, { useContext, useState } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./Firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  const handleGoogleSignIN = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const { displayName, email } = result.user;
        const signInUser = { name: displayName, email: email };
        setLoggedInUser(signInUser);
        history.replace(from);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const handleValueBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHashNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHashNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = "";
          setUser(newUserInfo);
          userUpdateName(user.name);
          // history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = "";
          setUser(newUserInfo);
          // history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    event.preventDefault();
  };

  const userUpdateName = (name) => {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: name
      })
      .then(() => {
        console.log("user name updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h3>Please Login First</h3>
      <button onClick={handleGoogleSignIN}>Google Sign In</button>
      <br/><br/>
      <p>Practice input form, redirects not complete.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          onChange={() => setNewUser(!newUser)}
          name="newUser"
          id=""
        />
        <label htmlFor="newUser">User Sign up</label>
        <br />
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleValueBlur}
            placeholder="write your name"
          />
        )}
        <br />
        <input
          type="email"
          name="email"
          onBlur={handleValueBlur}
          placeholder="write your email"
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleValueBlur}
          placeholder="write your password"
        />
        <br />
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>User created successfully</p>
      )}
      
     
    </div>
  );
};

export default Login;
