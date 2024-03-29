import React, { useState, useEffect } from "react";
import Class from "./Class";
import AddClass from "./AddClass";
import TextInput from "react-autocomplete-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Classes(props) {
  const [joined, setJoined] = useState(true);
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
    setActive(-1);
    props.loadUserClasses(loadUserClassesCallback);
  }, []);

  // This function and the next function are used to transform the retrieved tweets into react components.
  const createClass = _class => {
    return (
      <Class
        key={classes.indexOf(_class)}
        id={classes.indexOf(_class)}
        class={_class}
        setClass={props.setClass}
        active={active}
        setActive={setActive}
      />
    );
  };

  // Map the classes
  const createClasses = classes => {
    if (classes && classes.length > 0) {
      return classes.map(createClass);
    } else {
      return (
        <article class="message is-danger ">
          <div class="message-body">
            {joined
              ? "Oops! You haven't joined any classes!"
              : "Oops! There are no more classes. Create one!"}
          </div>
        </article>
      );
    }
  };

  // Helper functions and handlers

  function loadAllClassesCallback(result) {
    let val = [];
    var keys = Object.keys(result.data.result);
    keys.forEach(function(key) {
      val.push(result.data.result[key]);
    });
    setClasses(val);
  }

  function loadUserClassesCallback(result) {
    let val = [];
    var keys = Object.keys(result);
    keys.forEach(function(key) {
      val.push(result[key]);
    });
    setClasses(val);
  }

  function editingHandler(event) {
    setEditing(true);
  }

  const onSearchChange = event => {
    setFinding(event);
  };

  const onSearchSubmit = () => {
    props.getClass(finding, async result => {
      props.setClass(result.data.result);
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
              if (!joined) {
                setClassNames([]);
                props.loadUserClasses(loadUserClassesCallback);
                setJoined(true);
              }
            }}
          >
            Joined
          </a>
          <a
            className={`${joined ? "" : "is-active"}`}
            onClick={() => {
              if (joined) {
                setClassNames([]);
                props.loadAllClasses(loadAllClassesCallback);
                setJoined(false);
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
                    icon={"search"}
                  />
                </React.Fragment>
              </button>
            </div>
          </div>
        </div>

        <React.Fragment>{createClasses(classes)}</React.Fragment>
      </article>
    </div>
  );
  return content;
}

export default Classes;
