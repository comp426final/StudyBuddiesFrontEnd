import React, { useState } from "react";

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

  const root = "comp426-finalapi.herokuapp.com";


  // comp426-finalapi.herokuapp.com localhost:3001

  //Login callbacks
  const googleLogoutSuccess = () => {
    setLoggedIn(false);
  };

  const logInCallback = props => {
    setCurrentToken(props.data.jwt);
    setUser(props.data);

    updateUser(props.data.jwt, result => {
      setClass(result.data.result.data.classes[0]);
      setClasses(result.data.result.data.classes);
      setUser(result.data.result);
      setLoggedIn(true);
      setLoading(false);
    });
  };

  // API requests

  async function getClass(element, callback) {
    const result = await axios({
      method: "get",
      url: `http://${root}/public/classes/${element}`,
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    });
    if ( callback ) {
      callback(result);
    }
    return result;
  }

  async function loadAllClasses(callback) {
    const response = await axios({
      method: "get",
      url: `http://${root}/public/classes`
    });
    if (callback) {
      callback(response);
    }
  }

  async function loadUserClasses(callback) {
    let classes = [];
    const response = await axios({
      method: "get",
      url: `http://${root}/user/data/data/classes`,
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    });

    let done = 0;
    await response.data.result.forEach(async element => {
      let result = await getClass(element);
      classes.push(result.data.result);
      done += 1;
      if (callback && done === response.data.result.length) {
        callback(classes);
        setClasses(classes)
      }
    });
    if (callback && 0 === response.data.result.length) {
      callback(classes);
      setClasses(classes)
    }
    

    return classes;
  }

  async function updateUser(token, callback) {
    const response = await axios({
      method: "get",
      url: `http://${root}/user/data`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (callback) {
      callback(response);
    }
  }

  async function joinClass(user, _class, callback) {

    if (
      user.data.classes.filter(classEl => {
        if (_class.name === classEl.name) {
          return true;
        }
      }).length === 0
    ) {
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
        url: `http://${root}/user/data/data/classes`,
        data: {
          data: [_class.name],
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
        setUser(result.data.result);
      });
    } else {
      console.log("already joined");
    }
  }

  // Other Helpers
  
  async function onNewMessage() {
    getClass(currentClass.name, (result) => {
      setClass(result.data.result);
    })
    loadUserClasses(result=>{
      setClasses(result)
    })
  }

  let content = loading ? (
    <div className="App">
      <section className="hero is-info">
        <div className="hero-body"></div>
      </section>
    </div>
  ) : loggedIn ? (
    <div className="App">
      <section className="hero is-info">
        <div className="hero-body">
          <div className="container">
            <h1 className="title has-text-centered"> 
              Study Buddies
            </h1>
          </div>
        </div>
      </section>
      <section className="section is-marginless is-paddingless">
        <div className="columns is-gapless">
          <div className="column is-quarter">
            <React.Fragment>
              <Classes
                getClass={getClass}
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
            <div className="section">
              <React.Fragment>
                <EditMessage
                onNewMessage={onNewMessage}
                  currentToken={currentToken}
                  root={root}
                  content={"Send a message!"}
                  currentClass={currentClass}
                  currentUser={currentUser}
                />
                <Messages
                  messages={currentClass ? currentClass.messages : []}
                />
              </React.Fragment>
            </div>
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