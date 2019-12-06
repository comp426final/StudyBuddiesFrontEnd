import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

// import {axios} from "axios";

function LandingPage(props) {
  const [validPass, setValidPass] = useState("info");
  const [validUser, setValidUser] = useState("info");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [signUpMode, setSignUpMode] = useState(true);

  //Use Effects
  useEffect(() => {
    if (password.length > 7) {
      setValidPass("success");
    } else if (password.length === 0) {
      setValidPass("primary");
    } else {
      setValidPass("danger");
    }
  }, [password]);

  useEffect(() => {
    if (signUpMode) {
      if (username.length > 0) {
        checkUser(result => {
          if (result.status === 200) {
            setValidUser("success");
          } else {
            setValidUser("danger");
          }
        });
      } else if (username.length === 0) {
        setValidUser("primary");
      }
    }
  }, [username]);

  // Form update handlers
  const onUsernameChange = event => {
    const newVal = event.target.value;
    setUsername(newVal);
  };
  const onPasswordChange = event => {
    const newVal = event.target.value;
    setPassword(newVal);
  };

  // Google Login Callbacks
  const loginRequest = () => {
    props.setLoading(true);
  };
  const loginSuccess = response => {
    response.profileObj.classes = [];
    props.setUser(response.profileObj);
    props.setLoggedIn(true);
    props.setClass({
      name: "placeholder",
      messages: [
        {
          user: props.currentUser.givenName,
          content: "test message",
          id: 0
        }
      ],
      announcements: [
        {
          user: props.currentUser.givenName,
          content: "test announcement",
          id: 0
        }
      ],
      id: 0
    });
    props.setGoogleUser(true);
    setUsername(response.googleId);
    setPassword(response.googleId);

    checkUser(result => {
      if (result.status === 200) {
        logIn();
      } else {
        signUp();
        logIn();
      }
    });

    props.setLoading(false);
  };
  const loginFail = response => {
    console.log(response);
  };

  // Button handlers
  async function onSignUp() {
    props.setClass({
      name: "placeholder",
      messages: [
        {
          user: props.currentUser.givenName,
          content: "test message",
          id: 0
        }
      ],
      announcements: [
        {
          user: props.currentUser.givenName,
          content: "test announcement",
          id: 0
        }
      ],
      id: 0
    });
    await signUp();
    await logIn();
  }

  function onLogIn() {
    props.setClass({
      name: "placeholder",
      messages: [
        {
          user: props.currentUser.givenName,
          content: "test message",
          id: 0
        }
      ],
      announcements: [
        {
          user: props.currentUser.givenName,
          content: "test announcement",
          id: 0
        }
      ],
      id: 0
    });
    logIn();
  }

  // API requests comp426-finalapi.herokuapp.com localhost:3001
  async function checkUser(callback) {
    const result = await axios({
      method: "post",
      url: `http://comp426-finalapi.herokuapp.com/account/checkUser`,
      data: {
        name: username
      }
    });
    callback(result);
  }

  async function signUp() {
    const result = await axios({
      method: "post",
      url: `http://comp426-finalapi.herokuapp.com/account/create`,
      data: {
        name: username,
        pass: password
      }
    });
  }

  async function logIn() {
    const result = await axios({
      method: "post",
      url: `http://comp426-finalapi.herokuapp.com/account/login`,
      data: {
        name: username,
        pass: password
      }
    });
    if (result.status === 200) {
      props.setLoggedIn(true);
    }
  }

  const content = (
    <div className="App">
      <section className="hero is-primary">
        <div className="hero-body"></div>
      </section>
      <section className="section columns">
        <div className="box column is-offset-one-third is-one-third">
          <div className="content is-primary">
            <h2 className="title has-text-centered">
              Welcome to Study Buddies!
            </h2>
            <br />
            <div className="tabs is-boxed is-centered">
              <ul>
                <li
                  onClick={() => {
                    setSignUpMode(true);
                    checkUser(result => {
                      console.log(result);
                      if (result.status === 200) {
                        setValidUser("success");
                      } else {
                        setValidUser("danger");
                      }
                    });
                  }}
                  className={`${signUpMode ? "is-active" : ""}`}
                >
                  <a>Sign up</a>
                </li>
                <li
                  onClick={() => {
                    setSignUpMode(false);
                    setValidUser("primary");
                  }}
                  className={`${signUpMode ? "" : "is-active"}`}
                >
                  <a>Log in</a>
                </li>
              </ul>
            </div>
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input is-${validUser}`}
                  type="text"
                  placeholder="Username"
                  onChange={onUsernameChange}
                />
                <span className="icon is-small is-left">
                  <React.Fragment>
                    <FontAwesomeIcon icon="user" />
                  </React.Fragment>
                </span>
                <span className="icon is-small is-right">
                  <React.Fragment>
                    <FontAwesomeIcon icon="check" />
                  </React.Fragment>
                </span>
              </div>
              {validUser !== "danger" ? (
                <div></div>
              ) : (
                <p className="help is-danger">User already exists</p>
              )}
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input is-${validPass}`}
                  type="password"
                  placeholder="Text input"
                  onChange={onPasswordChange}
                />
                <span className="icon is-small is-left">
                  <React.Fragment>
                    <FontAwesomeIcon icon="lock" />
                  </React.Fragment>
                </span>
                <span className="icon is-small is-right">
                  <React.Fragment>
                    <FontAwesomeIcon icon="check" />
                  </React.Fragment>
                </span>
              </div>
              {validPass !== "danger" ? (
                <div></div>
              ) : (
                <p className="help is-danger">
                  Password must be at least 8 characters
                </p>
              )}
            </div>
          </div>

          <nav className="level">
            {signUpMode ? (
              <div className="level-left">
                <button className="button level-item" onClick={onSignUp}>
                  Sign up
                </button>
              </div>
            ) : (
              <div className="level-right">
                <button className="button level-item" onClick={onLogIn}>
                  Log in
                </button>
                <GoogleLogin
                  clientId="1094624501428-i10otiook503amuvr05dqjsvuop4pq8q.apps.googleusercontent.com"
                  render={renderProps => (
                    <button
                      className="button"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Log in with Google
                    </button>
                  )}
                  onRequest={loginRequest}
                  onSuccess={loginSuccess}
                  onFailure={loginFail}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            )}
          </nav>
        </div>
      </section>
    </div>
  );

  return content;
}
export default LandingPage;