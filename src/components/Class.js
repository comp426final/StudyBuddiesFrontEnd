import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Class(props) {
  const content = (
    <a
      onClick={ () => {
        props.setClass(props.class);
        props.setActive(props.id);

      }
    
    }
      className={`panel-block ${props.id === props.active ? "is-active" : ""} `}
    >
      <span className="panel-icon">
        <React.Fragment>
          <FontAwesomeIcon icon={props.joined ? "book" : `sign-in-alt`} />
        </React.Fragment>
      </span>
      {props.class.dep} {props.class.name}
    </a>
  );
  return content;
}

export default Class;
