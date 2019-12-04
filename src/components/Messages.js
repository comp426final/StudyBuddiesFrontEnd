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
       user={message.user}
      />
    );
  };

  // Map the messages
  const createMessages = (messages) => {
    console.log(messages);
    return messages.map(createMessage);
  };

    const content =  (
    <div className="box content">
        <React.Fragment>
            {createMessages(props.messages)}
        </React.Fragment>
    </div>);
    return content;
}

export default Messages