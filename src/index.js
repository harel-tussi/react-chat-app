import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Dashboard from "./components/dashboard/Dashboard";

import firebase from "firebase";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCZJYOmkORjkpZBZ_WBUI31kSfAHPBkyFg",
  authDomain: "chat-app-8fc51.firebaseapp.com",
  databaseURL: "https://chat-app-8fc51.firebaseio.com",
  projectId: "chat-app-8fc51",
  storageBucket: "chat-app-8fc51.appspot.com",
  messagingSenderId: "668255518149",
  appId: "1:668255518149:web:a4eb8b0cb01f32db909fac"
});

const routing = (
  <Router>
    <div id="routing-container">
      <Route path="/login" component={Login}></Route>
      <Route path="/signup" component={Signup}></Route>
      <Route path="/" exact component={Dashboard}></Route>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
