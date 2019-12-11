import React, {  } from "react";
import Message from "./Message"
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Messages (props) {

     // This function and the next function are used to transform the retrieved tweets into react components.
  const createMessage = message => {
    return (
      <Message
       key={message.id}
       content={message.content}
       user={message.author}
      />
    );
  };

  // Map the messages
  const createMessages = (messages) => {
    if ( messages ) {
    return messages.map(createMessage);
    } else { return; }
  };

    const content =  (
    <div className="section messages">
        <React.Fragment>
            {createMessages(props.messages)}
        </React.Fragment>
    </div>);
    return content;
}

export default Messages