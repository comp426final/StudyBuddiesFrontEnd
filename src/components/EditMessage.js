import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function EditMessage(props) {
  const [message, setMessage] = useState("");

  // Helper Functions and API requests
  function msgHelper(event) {
    const val = event.target.value;
    setMessage(val);
  }

  function onSubmitHandler() {
    addMessage(
      props.currentClass.name,
      props.currentUser.name,
      message,
      response => {
        props.onNewMessage();
      }
    );
  }

  async function addMessage(_class, author, content, callback) {
    let response = await axios({
      method: "post",
      url: `http://${props.root}/public/classes/${_class}/messages`,
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
    <div className="field is-grouped edit-message">
      <p className="control is-expanded">
        <input
          className="input is-primary"
          type="text"
          placeholder="Send a message!"
          onChange={msgHelper}
        />
      </p>
      <p className="control">
        <button
          className="button is-primary"
          onChange={msgHelper}
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

export default EditMessage;
