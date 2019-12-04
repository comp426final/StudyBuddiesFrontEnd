import React, { useState, useEffect } from "react";
// import {axios} from "axios";

import "./css/styles.css";
import Classes from "./components/Classes";
import Messages from "./components/Messages";
import Announcements from "./components/Announcements";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setUser] = useState([]);
  const [currentClass, setClass] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // let classes = getClasses();
    // setClass(classes[0]);
    // getQuickClass(currentClass);
    console.log(currentClass);
  }, [currentClass]);

  // Google Login Callbacks
  const loginRequest = () => {
    setLoading(true);
  };
  const loginSuccess = response => {
    response.profileObj.classes = [];
    setUser(response.profileObj);
    setLoggedIn(true);
    setClass({
      name: "placeholder",
      messages: [
        {
          user: currentUser.givenName,
          content: "test message",
          id: 0
        }
      ],
      announcements: [
        {
          user: currentUser.givenName,
          content: "test announcement",
          id: 0
        }
      ],
      id: 0
    });

    setLoading(false);
  };
  const loginFail = response => {
    console.log(response);
  };
  const logoutSuccess = () => {
    setLoggedIn(false);
  };
  // API requests
  //   async function getClasses() {
  //     const result = await axios({
  //       method: "get",
  //       url: `https://comp426-finalapi.herokuapp.com/classes/${currentUser.googleId}`,
  //     });
  //     console.log(result);
  //     return [];
  //  }

  //  async function getQuickClass() {
  //   const result = await axios({
  //     method: "get",
  //     url: `https://comp426-finalapi.herokuapp.com/${currentClass}`,
  //   });
  //   console.log(result);
  //   return [];
  //  }
  let content;
  if (loading) {
    content = (
      <div className="App">
        <section className="hero is-primary">
          <div className="hero-body"></div>
        </section>
      </div>
    );
  } else {
    content = loggedIn ? (
      <div className="App">
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Study Buddies</h1>
              <h2 className="subtitle">
                Welcome, {currentUser.givenName} {currentUser.familyName}!
              </h2>
            </div>
          </div>
        </section>
        <section className="section has-text-centered">
          <div className="columns">
            <div className="column is-quarter">
              <React.Fragment>
                <Classes classes={currentUser.classes} />
              </React.Fragment>
            </div>
            <div className="column is-half">
              <React.Fragment>
                <Messages messages={currentClass.messages} />
              </React.Fragment>
            </div>
            <div className="column is-quarter">
              <React.Fragment>
                <Announcements announcements={currentClass.announcements} />
              </React.Fragment>
            </div>
          </div>
        </section>
        <section className="">
          <footer className="footer">
            <GoogleLogout
              clientId="1094624501428-i10otiook503amuvr05dqjsvuop4pq8q.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={logoutSuccess}
            />
          </footer>
        </section>
      </div>
    ) : (
      <div className="App">
        <section className="hero is-primary">
          <div className="hero-body"></div>
        </section>
        <section className="section columns">
          <div className="box column is-offset-one-third is-one-third">
            <div className="content has-text-centered is-primary">
              <h2 className="title">Welcome to Study Buddies!</h2>
              <GoogleLogin
                clientId="1094624501428-i10otiook503amuvr05dqjsvuop4pq8q.apps.googleusercontent.com"
                buttonText="Login"
                onRequest={loginRequest}
                onSuccess={loginSuccess}
                onFailure={loginFail}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
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
