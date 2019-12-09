import React, { useState, useEffect } from "react";

import "./css/sticky.css";
import "./css/styles.css";
import Classes from "./components/Classes";
import Messages from "./components/Messages";
import Announcements from "./components/Announcements";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleLogout } from "react-google-login";
import LandingPage from "./components/LandingPage";
import EditMessage from "./components/EditMessage";
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [googleUser, setGoogleUser] = useState(false);
  const [currentUser, setUser] = useState([]);
  const [currentClass, setClass] = useState("");
  const [currentToken, setToken] = useState("");

  useEffect(() => {
    // let classes = getClasses();
    // setClass(classes[0]);
    // getQuickClass(currentClass);
    console.log(currentToken);
  }, [currentClass]);

  const logoutSuccess = () => {
    setLoggedIn(false);
  };
  const logInCallback = props => {
    setLoggedIn(true);
    setToken(props.jwt);
    getClasses();
  };

  // API requests
  async function getClasses() {
    const result = await axios({
      method: "get",
      url: `https://comp426-finalapi.herokuapp.com/classes/`
    });
    console.log(result);
    return [];
  }

  let content = loggedIn ? (
      <div className="App">
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title"></h1>
              <h2 className="subtitle">
                Welcome, {currentUser.givenName} {currentUser.familyName}!
              </h2>
            </div>
          </div>
        </section>
        <section className="section is-marginless is-paddingless">
          <div className="columns is-gapless">
            <div className="column is-quarter">
              <React.Fragment>
                <Classes classes={currentUser.classes} />
              </React.Fragment>
            </div>
            <div className="column is-half">
              <React.Fragment>
                <Messages messages={currentClass.messages} />
                <EditMessage content={"Send a message!"} />
              </React.Fragment>
            </div>
            <div className="column is-quarter">
              <React.Fragment>
                <Announcements announcements={currentClass.announcements} />
              </React.Fragment>
            </div>
          </div>
        </section>
        <section className="section is-marginless is-paddingless">
          <nav
            className="navbar is-fixed-bottom"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <div className="navbar-item">Study Buddies</div>
            </div>
            <div className="navbar-menu">
              <div className="navbar-end">
                <div className="navbar-item">
                  {googleUser ? (
                    <React.Fragment>
                      <GoogleLogout
                        clientId="1094624501428-i10otiook503amuvr05dqjsvuop4pq8q.apps.googleusercontent.com"
                        buttonText="Logout"
                        onLogoutSuccess={logoutSuccess}
                      />
                    </React.Fragment>
                  ) : (
                    <button className="button">Logout</button>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </section>
      </div>
    ) : (
      <React.Fragment>
        <LandingPage
          setLoggedIn={setLoggedIn}
          setUser={setUser}
          setGoogleUser={setGoogleUser}
        />
      </React.Fragment>
    );
  
  return content;
}

export default App;

/*
<div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="Username"
                />
                <span class="icon is-small is-left">
                  <React.Fragment>
                    <FontAwesomeIcon icon="user" />
                  </React.Fragment>
                </span>
                <span class="icon is-small is-right">
                  <React.Fragment>
                    <FontAwesomeIcon icon="check" />
                  </React.Fragment>
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="Password"
                />
                <span class="icon is-small is-left">
                  <React.Fragment>
                    <FontAwesomeIcon icon="lock" />
                  </React.Fragment>
                </span>
                <span class="icon is-small is-right">
                  <React.Fragment>
                    <FontAwesomeIcon icon="check" />
                  </React.Fragment>
                </span>
              </div>
            </div>
                        <div className="field has-text-centered">
              <div className="level">
                <div className="level-left">
                  <button className="button is-primary" onClick={loginHandler}>
                    Sign up
                  </button>
                </div>
                <div className="level-right">
                  <button className="button is-primary" onClick={loginHandler}>
                    Log in
                  </button>
                </div>
              </div>
            </div>
          */
