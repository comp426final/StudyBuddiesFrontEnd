import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Class(props) {
  console.log(props.class);
  const content = (
    <div className="panel-block" onClick={props.setClass}>
        <a className="panel-icon">
          <React.Fragment>
            <FontAwesomeIcon icon="book"  />
          </React.Fragment>
        </a>
        {props.class.name}
    </div>
  );
  return content;
}

export default Class;
