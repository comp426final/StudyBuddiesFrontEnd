import React from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Announcement (props) {
  const content = (
    <article className="message is-info is-light">
      <div className="message-header">
        <p>Hello World</p>
        <button className="delete" aria-label="delete"></button>
      </div>
      <div className="message-body">
        {props.content}
      </div>
    </article>
  );
  return content;
}

export default Announcement;
