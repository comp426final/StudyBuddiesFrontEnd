import React, { useState, useEffect, useReducer } from "react";

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
  const [loading, setLoading] = useState(false);
  const [googleUser, setGoogleUser] = useState(false);
  const [currentUser, setUser] = useState([]);
  const [currentClass, setClass] = useState("");
  const [currentClasses, setClasses] = useState("");
  const [currentToken, setCurrentToken] = useState("");

  const root = "localhost:3001";
  // comp426-finalapi.herokuapp.com localhost:3001


  //Login callbacks
  const googleLogoutSuccess = () => {
    setLoggedIn(false);
  };

  const logInCallback = props => {
    setCurrentToken(props.data.jwt);
    setUser(props.data);

    updateUser(props.data.jwt, result => {
      setClass(result.classes[0])
      setClasses(result.classes)
      setLoggedIn(true);    
      setLoading(false);
    });

 
  };

  // API requests
  async function loadAllClasses(callback) {
    const response = await axios({
      method: "get",
      url: `http://${root}/public/classes`
    });
    if (callback) {
      callback(response.data.result);
    }
  }

  async function loadUserClasses(callback) {
    const response = await axios({
      method: "get",
      url: `http://${root}/user/data/classes`,
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    });
    if (callback) {
      callback(response.data.result);
    }
  }

  async function updateUser( token, callback) {
    const response = await axios({
      method: "get",
      url: `http://${root}/user/data`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (callback) {
      callback(response.data.result);
    }
  }

  async function getMessages(className, callback) {
    const response = await axios({
      method: "get",
      url: `http://${root}/public/classes/${className}/messages`
    });
    if (callback) {
      callback(response.data.result);
    }
  }

  async function joinClass(user, _class, callback) {
    console.log(user.data.classes);
    console.log(_class.name);
    if (!user.data.classes.includes(_class.name)) {
      console.log(user);
      let response = await axios({
        method: "post",
        url: `http://${root}/public/classes/${_class.name}/members`,
        data: {
          data: [user],
          type: "merge"
        }
      });
      if (callback) {
        callback(response.data.result);
      }
      response = await axios({
        method: "post",
        url: `http://${root}/user/data/classes`,
        data: {
          data: [_class],
          type: "merge"
        },
        headers: {
          Authorization: `Bearer ${currentToken}`
        }
      });
      if (callback) {
        callback(response.data.result);
      }

      updateUser(currentToken, result => {
        console.log(result);
      })
    }
  }

  let content = loading ? (
    <div className="App">
      <section className="hero is-primary">
        <div className="hero-body"></div>
      </section>
    </div>
  ) : loggedIn ? (
    <div className="App">
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title"></h1>
            <h2 className="subtitle">Welcome!</h2>
          </div>
        </div>
      </section>
      <section className="section is-marginless is-paddingless">
        <div className="columns is-gapless">
          <div className="column is-quarter">
            <React.Fragment>
              <Classes
                loadAllClasses={loadAllClasses}
                loadUserClasses={loadUserClasses}
                classes={currentClasses}
                root={root}
                setClass={setClass}
                currentClass={currentClass}
                currentUser={currentUser}
                joinClass={joinClass}
              />
            </React.Fragment>
          </div>
          <div className="column is-half">
            <React.Fragment>
              <Messages messages={[]} />
              <EditMessage
                root={root}
                content={"Send a message!"}
                currentClass={currentClass}
                currentUser={currentUser}
              />
            </React.Fragment>
          </div>
          <div className="column is-quarter">
            <React.Fragment>
              <Announcements announcements={[]} />
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
                      onLogoutSuccess={googleLogoutSuccess}
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
        loading={loading}
        setLoading={setLoading}
        root={root}
        logInCallback={logInCallback}
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
