import React, { useState } from "react";
import "./css/styles.css";
import Classes from "./components/Classes";
import Messages from "./components/Messages";
import Classmates from "./components/Classmates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState([]);

  const loginSuccess = response => {
    setUser(response.profileObj)
    setLoggedIn(true);
  };
  const loginFail = response => {
    console.log(response);
  };
  const logoutSuccess = response => {
    setLoggedIn(false);
  };

  const content = loggedIn ? (
    <div className="App">
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Study Buddies</h1>
            <h2 className="subtitle">Welcome, {user.givenName} {user.familyName}!</h2>
          </div>
        </div>
      </section>
      <section className="section has-text-centered">
        <div className="columns">
          <div className="column is-quarter">
            <React.Fragment>
              <Classes classes={[]} />
            </React.Fragment>
          </div>
          <div className="column is-half">
            <React.Fragment>
              <Messages messages={[]} />
            </React.Fragment>
          </div>
          <div className="column is-quarter">
            <React.Fragment>
              <Classmates classmates={[]} />
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
              onSuccess={loginSuccess}
              onFailure={loginFail}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </section>
    </div>
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
