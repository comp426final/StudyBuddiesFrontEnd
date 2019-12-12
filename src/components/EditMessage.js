import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import uniqid from "uniqid";

function EditMessage(props) {
  const [message, setMessage] = useState("");

  // Helper Functions and API requests
  function msgHelper(event) {
    const val = event.target.value;
    setMessage(val);
  }

  function onSubmitHandler() {
    addMessage(props.currentClass, props.currentUser, message, response => {
      props.onNewMessage();
      setMessage("");
    });
  }

  async function addMessage(_class, user, content, callback) {
    if (!_class || !user || !content) {
      return;
    } else if (user.data.classes.includes(_class.name)) {
      let response = await axios({
        method: "post",
        url: `http://${props.root}/public/classes/${_class.name}/messages`,
        data: {
          data: { author: user.name, content: content, id: uniqid() },
          type: "merge"
        }
      });
      if (callback) {
        callback(response.data.result);
      }
    }
  }

  const content = (
    <div className="field has-addons edit-message">
      <p className="control is-expanded">
        <input
          className="input is-info"
          type="text"
          placeholder="Send a message!"
          onChange={msgHelper}
          value={message}
        />
      </p>
      <p className="control">
        <button
          className="button is-info"
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
