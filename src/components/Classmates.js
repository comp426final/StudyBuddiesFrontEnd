import React, {  } from "react";
import Classmate from "./Classmate";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Classmates (props) {

     // This function and the next function are used to transform the retrieved tweets into react components.
  const createClassmate = classmate => {
    return (
      <Classmate

      />
    );
  };

  // Map the classmates
  const createClassmates = (classmates) => {
    return classmates.map(createClassmate);
  };
  
    const content =  (
    <div>
        <React.Fragment>
            {createClassmates(props.classmates)}
        </React.Fragment>
    </div>);
    return content;
}

export default Classmates