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
