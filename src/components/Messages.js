import React, {  } from "react";
import Message from "./Message"
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Messages (props) {

     // This function and the next function are used to transform the retrieved tweets into react components.
  const createMessage = message => {
    return (
      <Message
       
      />
    );
  };

  // Map the messages
  const createMessages = (messages) => {
    return messages.map(createMessage);
  };

    const content =  (
    <div>
        <React.Fragment>
            {createMessages(props.messages)}
        </React.Fragment>
    </div>);
    return content;
}

export default Messages