import React, {  } from "react";
import Announcement from "./Announcement";
import Message from "./Message";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Announcements (props) {

     // This function and the next function are used to transform the retrieved tweets into react components.
  const createAnnouncement = announcement => {
    return (
      <Announcement
        key={announcement.id}
        content={announcement.content}
        author={announcement.author}
      />
    );
  };

  // Map the announcements
  const createAnnouncements = (announcements) => {
    if ( announcements ) {
    return announcements.map(createAnnouncement);
    } else { return }
  };
  
    const content =  (
    <div className="section is-dark">
        <React.Fragment>
            {createAnnouncements(props.announcements)}
        </React.Fragment>
    </div>);
    return content;
}

export default Announcements