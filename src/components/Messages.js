import React, { Component } from 'react';
import { database } from './firebase';
// import EditMessage from './EditMessage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import classID from './Classes';

//this decides which class or index of the array new messages are stored and which class messages are displayed.
var classID = 24;



class App extends Component {
  constructor() {
    super();

    this.state = {
      messages: [],
    };

    this.onAddMessage = this.onAddMessage.bind(this);
  }

  componentWillMount() {
    const messagesRef = database.ref('classes/' + classID + '/messages')
      .orderByKey()
      .limitToLast(100);

    messagesRef.on('child_added', snapshot => {
      const message = { text: snapshot.val(), id: snapshot.key };

      this.setState(prevState => ({
        messages: [message, ...prevState.messages],
      }));
    });
  }

  onAddMessage(event) {
    event.preventDefault();

    database.ref('classes/' + classID + '/messages').push(this.input.value);

    this.input.value = '';
  }

  render() {
    return (
      <div className="field is-grouped edit-message">
        <form onSubmit={this.onAddMessage}>
          <p className="control is-expanded">
            <input
              type="text"
              className="input is-primary"
              placeholder="Send a message!"
              ref={node => this.input = node} />
          </p>
          <p className="control"> 
            <button type="submit" className="button is-primary">
              <React.Fragment>
                <FontAwesomeIcon icon="paper-plane" />
              </React.Fragment>
            </button>
          </p>
          {/* <input type="submit"/> */}
          <ul>
            {this.state.messages.map(message =>
              <li key={message.id}>{message.text}</li>
            )}
          </ul>
        </form>
      </div>
    );
  }
}

export default App;