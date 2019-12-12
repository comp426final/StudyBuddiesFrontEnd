import React, { useState, useEffect } from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CurrentClass(props) {
  const [joined, setJoined] = useState(true);
  const [joinFailed, setJoinFailed] = useState(false);
  const [joinSucceeded, setJoinSucceeded] = useState(false);
  const [leaveFailed, setLeaveFailed] = useState(false);
  const [leaveSucceeded, setLeaveSucceeded] = useState(false);
  
  useEffect( () => {
    setJoinSucceeded(false);
    setJoinFailed(false);
    setLeaveFailed(false);
    setLeaveSucceeded(false);

    if ( props.class && props.user.data.classes.includes(props.class.name)) {
      setJoined(true);
    } else {
      setJoined(false);
    }
  },[props.class])
  async function onLeaveClass() {
    const status = await props.leaveClass(props.user, props.class);
    if (status === 400) {
      setLeaveFailed(true);
      setLeaveSucceeded(false);
    } else {
      setJoined(false);
      setLeaveFailed(false);
      setLeaveSucceeded(true);
    }
  
  }
  async function onJoinClass() {
    const status = await props.joinClass(props.user, props.class);
    if (status === 400) {
      setJoinFailed(true);
      setJoinSucceeded(false);
    } else {
      setJoined(true)
      setJoinFailed(false);
      setJoinSucceeded(true);
    }
  }

  if (props.class) {
    const content = (
      <div className="content">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              {" "}
              <span className="card-header-icon has-text-info has-text-heavy">
                {props.class.dep}
              </span>
              {props.class.number} - {props.class.name}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              {props.class.description}
              {joinFailed ? (
                <article class="message is-danger">
                  <div class="message-body">You're already in this class.</div>
                </article>
              ) : 
              joinSucceeded ? (
                <article class="message is-success">
                  <div class="message-body">You're now in this class!</div>
                </article>
              ) : leaveFailed ? (
                <article class="message is-danger">
                  <div class="message-body">You're already not in this class.</div>
                </article>
              ) : leaveSucceeded ? (
                <article class="message is-success">
                  <div class="message-body">You're no longer in this class!</div>
                </article>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <footer class="card-footer">
              <a className={`card-footer-item has-text-info`} onClick={joined? onLeaveClass : onJoinClass}> {joined ? "Leave": "Join"}</a>
          </footer>
        </div>
      </div>
    );
    return content;
  } else {
    return <div></div>;
  }
}

export default CurrentClass;
