import React from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Message(props) {
  const content = (
    <article className="message">
      <div className="message-body">
        {props.content}
      </div>
    </article>
  );
  return content;
}

export default Message;
