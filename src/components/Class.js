import React, {  } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Class () {
    const content =  (
        <div className="panel-block">
        <p className="control has-icons-left">
          <input className="input is-primary" type="text" placeholder="Search"/>
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true"/>
          </span>
        </p>
      </div>);
    return content;
}

export default Class