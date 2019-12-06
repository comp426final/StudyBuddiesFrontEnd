import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";


// import {axios} from "axios";

function LandingPage(props) {

  const [validPass, setValidPass] = useState(true);
  const [validUser, setValidUser] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("agda;dlkjnan");

    //Use Effects
  useEffect ( () => {
    if ( password.length>8 ) {
        setValidPass(true)
    } else {
        setValidPass(false)
    }
  },[password])

  useEffect ( () => {
      if (username.length > 0 ) {
        checkUser();
      } else {
          setValidUser(true);
      }
  },[username])

    // Form update handlers
  const onUsernameChange = event => {
    const newVal = event.target.value;
    setUsername(newVal);
  }
  const onPasswordChange = (event) => {
    const newVal = event.target.value;
    setPassword(newVal);
}
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

    props.setLoading(false);
  };
  const loginFail = response => {
    console.log(response);
  };

    // API requests comp426-finalapi.herokuapp.com
    async function checkUser () {
        const result = await axios({
            method: "get",
            url: `http://localhost:3001/public/checkUser?name=ted`,
            params: {
                name: username
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
              },
          });
           
         }

    const content = (<div className="App">
    <section className="hero is-primary">
      <div className="hero-body"></div>
    </section>
    <section className="section columns">
      <div className="box column is-offset-one-third is-one-third">
        <div className="content is-primary">
          <h2 className="title has-text-centered">Welcome to Study Buddies!</h2>
          <br/>
          <h3 className="subtitle has-text-centered">Create an account</h3>
          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className={`input ${validUser ? "is-success" : "is-danger"}`}
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
            <p className="help is-success">This username is available</p>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className= {`input ${validPass ? "is-success" : "is-danger"}`}
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
{validPass ?  <div></div> : <p className="help is-danger">Password must be at least 8 characters</p> }
          </div>
          <h3 className="subtitle has-text-centered">-or-</h3>
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

return content;


}
export default LandingPage