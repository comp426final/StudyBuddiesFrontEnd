import React, { useState } from "react";
import Class from "./Class";
import AddClass from "./AddClass";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Classes(props) {
  const [joined, setJoined] = useState(true);
  const [classes, setClasses] = useState([]);
  const [editing, setEditing] = useState(false);

  // This function and the next function are used to transform the retrieved tweets into react components.
  const createClass = _class => {
    return <Class key={classes.indexOf(_class)} class={_class} setClass={props.setClass} joinClass={joinClass}/>;
  };

  // Map the classes
  const createClasses = classes => {
    if (classes && classes.length > 0) {
      return classes.map(createClass);
    } else {
      return (
        <div className="panel-block">
          <p className="content has-text-centered">
            oops, you haven't joined any classes!
          </p>
        </div>
      );
    }
  };

  // Helper functions and handlers
  function loadAllClassesCallback(result) {
    console.log(result);
    let val = [];
    var keys = Object.keys(result);
    keys.forEach(function(key){
        val.push(result[key]);
    });
    console.log(val);
    setClasses(val);
  }

  function panelHelper(classes, state) {
    setClasses(classes);
    setJoined(state);
  }

  function editingHandler(event) {
    setEditing(true);
  }

  

  const content = editing ? (
    <div>
      <React.Fragment>
        <AddClass root={props.root} setEditing={setEditing} />
      </React.Fragment>
    </div>
  ) : (
    <div className="section is-dark">
      <article className="panel is-primary content">
        <div className="panel-heading level">
          <div className="level-left">
            <p className="level-item">Classes</p>
          </div>
          <div className="level-right">
            <button className="button level-item" onClick={editingHandler}>
            <React.Fragment>
              <FontAwesomeIcon icon="plus" />
            </React.Fragment>

            </button>
          </div>
        </div>
        <p className="panel-tabs">
          <a
            className={`${joined ? "is-active" : ""}`}
            onClick={() => {
              panelHelper(props.loadUserClasses(), true);
            }}
          >
            Joined
          </a>
          <a
            className={`${joined ? "" : "is-active"}`}
            onClick={() => {
              panelHelper(props.loadAllClasses(loadAllClassesCallback), false);
            }}
          >
            Search
          </a>
        </p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              className="input is-primary"
              type="text"
              placeholder="Search"
            />
            <span className="icon is-left">
              <React.Fragment>
                <FontAwesomeIcon icon="search" />
              </React.Fragment>{" "}
            </span>
          </p>
        </div>
        <React.Fragment>{createClasses(classes)}</React.Fragment>
      </article>
    </div>
  );
  return content;
}

export default Classes;
