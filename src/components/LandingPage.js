import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "../../node_modules/react";
import { GoogleLogin } from "../../node_modules/react-google-login";
import { DebounceInput } from "../../node_modules/react-debounce-input";
import axios from "../../node_modules/axios";
import uniqid from "uniqid"

// import {axios} from "axios";
import List from "./List";

function LandingPage(props) {
  const [validPass, setValidPass] = useState("info");
  const [validUser, setValidUser] = useState("info");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [signUpMode, setSignUpMode] = useState(true);

  const [loginFailed, setLoginFailed] = useState(false);

  //Use Effects
  useEffect(() => {
    if (password.length > 7) {
      setValidPass("success");
    } else if (password.length === 0) {
      setValidPass("info");
    } else {
      setValidPass("danger");
    }
  }, [password]);

  useEffect(() => {
    if (signUpMode) {
      if (username.length > 0) {
        checkUser(username, result => {
          if (result.status === 200) {
            setValidUser("success");
          } else {
            setValidUser("danger");
          }
        });
      } else if (username.length === 0) {
        setValidUser("info");
      }
    } else {
      if (username.length > 0) {
        checkUser(username, result => {
          if (result.status !== 200) {
            setValidUser("success");
          } else {
            setValidUser("danger");
          }
        });
      } else if (username.length === 0) {
        setValidUser("info");
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
  const googleLoginRequest = () => {
    props.setLoading(true);
  };

  const googleLoginSuccess = response => {
    const ID = response.googleId;
    const name = response.profileObj.givenName;
    checkUser(name, result => {
      if (result.status !== 200) {
        logIn(name, ID);
      } else {
        signUp(name, ID, () => {
          logIn(name, ID, result => {
            console.log(result);
            addUser(name, result.data.jwt);
          });
        });
      }
    });

    props.setGoogleUser(true);
    props.setLoading(false);
  };

  const googleLoginFail = response => {
    setLoginFailed(true);
    props.setLoading(false);
  };

  // Button handlers
  function onSignUp() {
    props.setLoading(true);
    signUp(username, password, result => {
      if (result.status === 200) {
        logIn(username, password, result => {
          if (result.status === 200) {
            addUser(username, result.data.jwt);
          } else {
            setLoginFailed(true);
          }
        });
      } else {
        setLoginFailed(true);
      }
    });
    props.setLoading(false);
  }

  function onLogIn() {
    props.setLoading(true);
    logIn(username, password);
    props.setLoading(false);
  }

  // API requests comp426-finalapi.herokuapp.com localhost:3001
  async function checkUser(name, callback) {
    const response = await axios({
      method: "post",
      url: `http://${props.root}/account/checkUser`,
      data: {
        name: name
      }
    });
    if (callback) {
      callback(response);
    }
  }

  async function signUp(name, pass, callback) {
    const response = await axios({
      method: "post",
      url: `http://${props.root}/account/create`,
      data: {
        name: name,
        pass: pass,
        data: {
          classes: []
        }
      }
    });
    if (callback) {
      callback(response);
    }
  }

  async function addUser(name, token, callback) {
    const response = await axios({
      method: "post",
      url: `http://${props.root}/user/data`,
      data: {
        data: {
          name: name,
          data: {
            classes: []
          }
        }
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (callback) {
      callback(response);
    }
  }

  async function logIn(name, pass, callback) {
    try{
    const response = await axios({
      method: "post",
      url: `http://${props.root}/account/login`,
      data: {
        name: name,
        pass: pass
      }
    });
    if (callback) {
      callback(response);
    }
    props.logInCallback(response);
   } catch (err) {
     if (err.response.status === 401) {
       setLoginFailed(true);
     }
   }
  }

  let content = (
    <div className="App">
      <section className="hero is-info">
        <div className="hero-body">
          <div className="container">
            <h1 className="title has-text-centered">Study Buddies</h1>
          </div>
        </div>
      </section>
      <section className="section columns">
        <section className="section columns">
            <div className="box column">
              <figure className="image">
                <img src="http://clipart-library.com/img1/867625.jpg"></img>
              </figure>
            </div>
          </section>
        <div className="box column is-offset-1 is-one-third">
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
                    if (username.length !== 0) {
                      checkUser(username, result => {
                        if (result.status === 200) {
                          setValidUser("success");
                        } else {
                          setValidUser("danger");
                        }
                      });
                    }
                  }}
                  className={`${signUpMode ? "is-active" : ""}`}
                >
                  <a>Sign up</a>
                </li>
                <li
                  onClick={() => {
                    setSignUpMode(false);
                    if (username.length !== 0) {
                      checkUser(username, result => {
                        if (result.status !== 200) {
                          setValidUser("success");
                        } else {
                          setValidUser("danger");
                        }
                      });
                    }
                  }}
                  className={`${signUpMode ? "" : "is-active"}`}
                >
                  <a>Log in</a>
                </li>
              </ul>
            </div>
            {loginFailed ? (
              <article className="message is-danger">
                <div className="message-body">Login failed.</div>
              </article>
            ) : (
              <div></div>
            )}
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left has-icons-right">
                <DebounceInput
                  minLength={1}
                  debounceTimeout={300}
                  onChange={onUsernameChange}
                  className={`input is-${validUser}`}
                  type="text"
                  placeholder="Username"
                />
                <span className="icon is-small is-left">
                  <React.Fragment>
                    <FontAwesomeIcon icon="user" />
                  </React.Fragment>
                </span>
                <span className={`icon is-small is-right`}>
                  <React.Fragment>
                    <FontAwesomeIcon
                      icon={`${
                        validUser === "danger"
                          ? "exclamation-triangle"
                          : "check"
                      }`}
                    />
                  </React.Fragment>
                </span>
              </div>
              {signUpMode && validUser === "danger" ? (
                <p className="help is-danger">Username already taken</p>
              ) : validUser === "success" ? (
                <p className="help is-success">Username is available</p>
              ) : (
                <p />
              )}
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left has-icons-right">
                <DebounceInput
                  minLength={1}
                  debounceTimeout={400}
                  onChange={onPasswordChange}
                  className={`input is-${validPass}`}
                  type="password"
                  placeholder="Password"
                />
                <span className="icon is-small is-left ">
                  <React.Fragment>
                    <FontAwesomeIcon icon="lock" />
                  </React.Fragment>
                </span>
                <span className={`icon is-small is-right`}>
                  <React.Fragment>
                    <FontAwesomeIcon
                      icon={`${
                        validPass === "danger"
                          ? "exclamation-triangle"
                          : "check"
                      }`}
                    />
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

          {signUpMode ? (
            <nav className="level">
              <div className="level-left">
                <div className="field">
                  <button className="button level-item is-info" onClick={onSignUp}>
                    Sign up
                  </button>
                </div>
              </div>
              <div className="level-right">
                <div className="field">
                  <GoogleLogin
                    clientId="1094624501428-i10otiook503amuvr05dqjsvuop4pq8q.apps.googleusercontent.com"
                    render={renderProps => (
                      <button
                        className="button level-item is-success"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        Sign up with Google
                      </button>
                    )}
                    onRequest={googleLoginRequest}
                    onSuccess={googleLoginSuccess}
                    onFailure={googleLoginFail}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
              </div>{" "}
            </nav>
          ) : (
            <nav className="level">
              <div className="level-left">
                <div className="field">
                  <button className="button level-item is-info" onClick={onLogIn}>
                    Log in
                  </button>
                </div>
              </div>
              <div className="level-right">
                <div className="field">
                  <GoogleLogin
                    clientId="1094624501428-i10otiook503amuvr05dqjsvuop4pq8q.apps.googleusercontent.com"
                    render={renderProps => (
                      <button
                        className="button level-item is-success"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        Log in with Google
                      </button>
                    )}
                    onRequest={googleLoginRequest}
                    onSuccess={googleLoginSuccess}
                    onFailure={googleLoginFail}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
              </div>
            </nav>
          )}
        </div>
        <section className="section columns is-offset-1">
          <div className="box column is-offset-1">
            <div className="content is-primary">
              <h2 className="title has-text-centered">
                General Announcements!
              </h2>
            </div>
            <List />
          </div>
        </section>
      </section>
    </div>
  );

  return content;
}
export default LandingPage;
