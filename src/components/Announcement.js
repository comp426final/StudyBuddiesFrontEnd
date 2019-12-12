import React from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Announcement(props) {
  const content = (
    <article className={`message is-${props.announcement.color}`}>
      <div className="message-header">
          <strong>Posted By {props.announcement.author}</strong>
          { (props.user.name === props.announcement.author && props.user.data.classes.includes(props.class.name)) ? 
        <button
          class="delete"
          onClick={() => {
            props.deleteAnnouncement(props.class, props.announcement);
          }}
        ></button> : <div></div>}
      </div>
      <div className="message-body">{props.announcement.content}</div>
    </article>
  );
  return content;
}

export default Announcement;
