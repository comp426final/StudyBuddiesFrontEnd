import React from "react";
// import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditMessage(props) {
  const content = (
    <div className="field is-grouped edit-message">
      <p className="control is-expanded">
        <input
          className="input is-primary"
          type="text"
          placeholder="Send a message!"
        />
      </p>
      <p className="control">
        <a className="button is-primary">
          <React.Fragment>
            <FontAwesomeIcon icon="paper-plane" />
          </React.Fragment>
        </a>
      </p>
    </div>
  );
  return content;
}

export default EditMessage;
