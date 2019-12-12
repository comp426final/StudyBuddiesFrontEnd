import React, { useState, useEffect } from "react";
import Class from "./Class";
import AddClass from "./AddClass";
import TextInput from "react-autocomplete-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Classes(props) {
  const [joined, setJoined] = useState(true);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [classes, setClasses] = useState([]);
  const [classNames, setClassNames] = useState([]);
  const [editing, setEditing] = useState(false);
  const [active, setActive] = useState(0);
  const [finding, setFinding] = useState("");

  useEffect(() => {
    let names = [];
    classes.forEach(clss => {
      names.push(clss.name);
    });
    setClassNames(names);
    console.log(classes);
    console.log(names);
  }, [classes]);

  useEffect(() => {
    props.loadUserClasses(loadUserClassesCallback);
  }, []);

  // This function and the next function are used to transform the retrieved tweets into react components.
  const createClass = _class => {
    return (
      <Class
        setAlreadyJoined={setAlreadyJoined}
        getClass={props.getClass}
        currentUser={props.currentUser}
        key={classes.indexOf(_class)}
        id={classes.indexOf(_class)}
        class={_class}
        setClass={props.setClass}
        joinClass={props.joinClass}
        active={active}
        setActive={setActive}
        joined={joined}
      />
    );
  };

  // Map the classes
  const createClasses = classes => {
    if (classes && classes.length > 0) {
      return classes.map(createClass);
    } else {
      return (
        <div className="content has-text-centered has-icons-left">
          <span className="icon is-left">
            <React.Fragment>
              <FontAwesomeIcon icon="exclamation-triangle" />
            </React.Fragment>
          </span>
          <p>
            {joined
              ? "Oops! You haven't joined any classes!"
              : "Oops! There are no more classes. Create one!"}
          </p>
        </div>
      );
    }
  };

  // Helper functions and handlers

  function loadAllClassesCallback(result) {
    let val = [];
    console.log(result);
    var keys = Object.keys(result.data.result);
    keys.forEach(function(key) {
      val.push(result.data.result[key]);
    });
    setClasses(val);
    console.log(val);

    props.setClass(val[0]);
    setActive(0);
  }

  function loadUserClassesCallback(result) {
    let val = [];
    var keys = Object.keys(result);
    keys.forEach(function(key) {
      val.push(result[key]);
    });
    setClasses(val);
    console.log(val);
    props.setClass(val[0]);
    setActive(0);
  }

  function editingHandler(event) {
    setEditing(true);
  }

  const onSearchChange = event => {
    setFinding(event);
  };

  const onSearchSubmit = () => {
    props.getClass(finding, async result => {
      const status = await props.joinClass(props.currentUser, result.data.result);
         if (status === 400 ) {
           setAlreadyJoined(true);
         } else { setAlreadyJoined(false)}
    });
  };

  const content = editing ? (
    <div>
      <React.Fragment>
        <AddClass
          root={props.root}
          setEditing={setEditing}
          loadAllClassesCallback={loadAllClassesCallback}
          loadAllClasses={props.loadAllClasses}
        />
      </React.Fragment>
    </div>
  ) : (
    <div className="section is-dark">
      <article className="panel is-info content">
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
              if ( !joined ) {
              setClassNames([]);
              props.loadUserClasses(loadUserClassesCallback);
              setJoined(true);
              setAlreadyJoined(false);
              }
            }}
          >
            Joined
          </a>
          <a
            className={`${joined ? "" : "is-active"}`}
            onClick={() => {
              if ( joined ) {
              setClassNames([]);
              props.loadAllClasses(loadAllClassesCallback);
              setJoined(false);
              setAlreadyJoined(false);
              }
            }}
          >
            Search
          </a>
        </p>
        <div className="panel-block">
          <div className="field has-addons">
            <div className="control is-expanded">
              <React.Fragment>
                <TextInput
                  options={classNames}
                  className="input is-info"
                  placeholder="Search"
                  Component="input"
                  trigger=""
                  spacer=""
                  onChange={onSearchChange}
                />
              </React.Fragment>
            </div>
            <div className="control">
              <button className="button is-info" onClick={onSearchSubmit}>
                <React.Fragment>
                  <FontAwesomeIcon
                    icon={props.joined ? "book" : `sign-in-alt`}
                  />
                </React.Fragment>
              </button>
            </div>
          </div>
        </div>
        {alreadyJoined ? (
          <article class="message is-danger">
            <div class="message-body">You're already in this class.</div>
          </article>
        ) : (
          <div></div>
        )}
        <React.Fragment>{createClasses(classes)}</React.Fragment>
      </article>
    </div>
  );
  return content;
}

export default Classes;
