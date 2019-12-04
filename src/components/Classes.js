import React, {  } from "react";
import Class from "./Class"
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Classes (props) {
     // This function and the next function are used to transform the retrieved tweets into react components.
  const createClass = _class => {
    return (
      <Class

      />
    );
  };

  // Map the classes
  const createClasses = (classes) => {
    return classes.map(createClass);
  };

    const content =  (
    <div>
        <React.Fragment>
            {createClasses(props.classes)}
        </React.Fragment>
    </div>);
    return content;
}

export default Classes