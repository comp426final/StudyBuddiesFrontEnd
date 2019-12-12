import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Class(props) {
  const content = (
    <a
      onClick={ async () => {
        if (!props.joined) {
         const status = await props.joinClass(props.currentUser, props.class);
         console.log(status);
         if (status === 400 ) {
           props.setAlreadyJoined(true);
         } else { props.setAlreadyJoined(false)}
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
