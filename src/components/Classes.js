import React from "react";
import Class from "./Class";
// import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Classes(props) {
  // This function and the next function are used to transform the retrieved tweets into react components.
  const createClass = _class => {
    return <Class key={_class.id} />;
  };

  // Map the classes
  const createClasses = classes => {
    if ( classes ) {
      return classes.map(createClass);
    } else { return };
  };
  const content = (
    <div className="section is-dark">
      <article className="panel is-primary content">
        <p className="panel-heading">Classes</p>
        <p className="panel-tabs">
          <a className="is-active">Joined</a>
          <a>Search</a>
        </p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input className="input is-primary" type="text" placeholder="Search" />
            <span className="icon is-left">
              <React.Fragment>
                <FontAwesomeIcon icon="search" />
              </React.Fragment>{" "}
            </span>
          </p>
        </div>
        <React.Fragment>{createClasses(props.classes)}</React.Fragment>
      </article>
    </div>
  );
  return content;
}

export default Classes;