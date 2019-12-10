import Class from "./Class";
import React, { Component } from 'react';

// import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from 'firebase';
import app from 'firebase/app';

// function Classes(props) {
// This function and the next function are used to transform the retrieved tweets into react components.
// const createClass = _class => {
//   return <Class key={_class.id} />;
// };

// // Map the classes
// const createClasses = classes => {
//   if ( classes ) {
//     return classes.map(createClass);
//   } else { return };
// };
const config = {
  apiKey: "AIzaSyB6IV9Aume-VIscucb2cvFAGbMO0paYjTQ",
  authDomain: "study-buddies-73972.firebaseapp.com",
  databaseURL: "https://study-buddies-73972.firebaseio.com",
  projectId: "study-buddies-73972",
  storageBucket: "study-buddies-73972.appspot.com",
  messagingSenderId: "678592520237",
  appId: "1:678592520237:web:0aae7d7170d42a4ffc18a4",
  measurementId: "G-3Y2TQEW7K3"
};

firebase.initializeApp(config);

class Classes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classes: []
    };
  };

  componentDidMount() {
    const classRef = firebase.database().ref('classes');
    classRef.on('value', (snapshot) => {
      let classes = snapshot.val();
      let newState = [];
      for (let course in classes) {
        newState.push({
          id: course,
          department: classes[course].department,
          number: classes[course].number,
          description: classes[course].description
        });
      }
      this.setState({
        classes: newState
      });
    });
  }

  render() {
    return (
      <div>
      <section className="section is-dark">
        <article className="panel is-primary content">
          <p className="panel-heading">Classes</p>
          <p className="panel-tabs">
            <a className="is-active">Joined</a>
            <a>Search</a>
          </p>
          <div className="panel-block">
            <p className="control has-icons-left">
              <input className="input is-primary" type="text" placeholder="Search" />
              <span className="icon is-left">
                <React.Fragment>
                  <FontAwesomeIcon icon="search" />
                </React.Fragment>{" "}
              </span>
            </p>
          </div>
          {/* <React.Fragment>{createClasses(props.classes)}</React.Fragment> */}
          <section>
        <section>
          <div>
            {this.state.classes.map((course) => {
              return (
                <div class="card">
                  <h5 class="card-header">{course.department + " " + course.number}</h5>
                  <div class="card-body">
                    <p class="card-text">{course.description}</p>
                    <div class="btn btn-primary">Add Class</div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </section>
        </article>
      </section>
      </div>
    )
  }



}
export default Classes;
