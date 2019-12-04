import React, {  } from "react";
import Announcement from "./Announcement";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Announcements (props) {

     // This function and the next function are used to transform the retrieved tweets into react components.
  const createAnnouncement = announcement => {
    return (
      <Announcement
        key={announcement.id}
        content={announcement.content}
      />
    );
  };

  // Map the announcements
  const createAnnouncements = (Announcements) => {
    return Announcements.map(createAnnouncement);
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