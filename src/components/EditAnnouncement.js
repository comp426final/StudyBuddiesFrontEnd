import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import uniqid from "uniqid"

function EditAnnouncement(props) {
  const [announcement, setAnnouncement] = useState("");
  const [color, setColor] = useState("")

  // Helper Functions and API requests
  function annHelper(event) {
    const val = event.target.value;
    setAnnouncement(val);
  }

  const selectorHandler = event => {
    const val = event.target.value;
    console.log(val);
    if ( val === ":)") {
      setColor('success');
    } else if ( val === ":|" ) {
      setColor("warning");
    } else {
      setColor("danger");
    }
  }

  function onSubmitHandler() {
    addAnnouncement(
      props.currentClass,
      props.currentUser,
      announcement,
      color
      ,
      response => {
        props.onNewAnnouncement();
        setAnnouncement("");
      }
    );
  }

  async function addAnnouncement(_class, user, content, color, callback) {
    if (!_class || !user || !content) {
      return;
    } else if (user.data.classes.includes(_class.name)){
    let response = await axios({
      method: "post",
      url: `http://${props.root}/public/classes/${_class.name}/announcements`,
      data: {
        data: { author: user.name, content: content, color: color, id: uniqid() },
        type: "merge"
      }
    });
    if (callback) {
      callback(response.data.result);
    }
  }
  }

  const content = (
    <div class="field has-addons has-addons-centered">
      <p class="control">
        <span class="select">
          <select onChange={selectorHandler}>
          <option key={" "} value=" "> </option>
            <option key={":)"} value=":)">:)</option>
            <option key={":("} value=":(">:(</option>
            <option key={":|"} value=":|">:|</option>
          </select>
        </span>
      </p>
      <p className="control is-expanded">
        <textarea
          className="input is-info"
          type="text"
          placeholder="Send an announcement!"
          onChange={annHelper}
          value={announcement}
        />
      </p>
      <p class="control">
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
