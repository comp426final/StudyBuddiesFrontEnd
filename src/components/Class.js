import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Class(props) {
  const content = (
    <div
      onClick={() => {
        if (!props.joined) {
          props.joinClass(props.currentUser, props.class);
        }
      }}
      className={`panel-block ${props.id === props.active ? "is-active" : ""}`}
    >
      <a
        className="panel-icon"
        onClick={() => {
          props.setClass(props.class);
          props.setActive(props.id);
        }}
      >
        <React.Fragment>
          <FontAwesomeIcon icon={props.joined ? "book" : `sign-in-alt`} />
        </React.Fragment>
      </a>
      {props.class.name}
    </div>
  );
  return content;
}

export default Class;
