import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Class(props) {
  const content = (
    <a
      onClick={() => {
        if (!props.joined) {
          props.joinClass(props.currentUser, props.class);
        } else {
          props.getClass(props.class.name, result => {
            props.setClass(result.data.result);
            props.setActive(props.id);
          });
        }
      }}
      className={`panel-block ${props.id === props.active ? "is-active" : ""} `}
    >
      <span className="panel-icon">
        <React.Fragment>
          <FontAwesomeIcon icon={props.joined ? "book" : `sign-in-alt`} />
        </React.Fragment>
      </span>
      {props.class.name}
    </a>
  );
  return content;
}

export default Class;
