import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";


function EditAnnouncement(props) {
  const [announcement, setAnnouncement] = useState("");

  // Helper Functions and API requests
  function annHelper(event) {
    const val = event.target.value;
    setAnnouncement(val);
  }

  function onSubmitHandler() {
    addAnnouncement(
      props.currentClass.name,
      props.currentUser.name,
      announcement,
      response => {
        props.onNewAnnouncement();
      }
    );
  }

  async function addAnnouncement(_class, author, content, callback) {
    let response = await axios({
      method: "post",
      url: `http://${props.root}/public/classes/${_class}/announcements`,
      data: {
        data: {author: author, content: content},
        type: "merge"
      }
    });
    if (callback) {
      callback(response.data.result);
    }
    
  }

  const content = (
    <div className="field has-addons edit-message">
      <p className="control is-expanded">
        <input
          className="input is-info"
          type="text"
          placeholder="Send an announcement!"
          onChange={annHelper}
        />
      </p>
      <p className="control">
        <button
          className="button is-info"
          onChange={annHelper}
          onClick={onSubmitHandler}
        >
          
          <React.Fragment>
            <FontAwesomeIcon icon="paper-plane" />
          </React.Fragment>
        </button>
      </p>
    </div>
  );
  return content;
}

export default EditAnnouncement;
