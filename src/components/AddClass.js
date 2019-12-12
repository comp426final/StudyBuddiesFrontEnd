import React, { useState } from "../../node_modules/react";
import { DebounceInput } from "../..//node_modules/react-debounce-input";
import axios from "../../node_modules/axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddClass(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [number, setNumber] = useState("");
  const [validClass, setValidClass] = useState("info");
  const [validDep, setValidDep] = useState("info");

  // API requests
  async function checkClass(name, callback) {
    try {
      const response = await axios({
        method: "get",
        url: `http://${props.root}/public/classes/${name}`
      });
      if (callback) {
        callback(response);
      }
    } catch (err) {
      if (err.response.status === 404) {
        callback(err.response);
      }
    }
  }

  async function addClass(name, dep, description, callback) {
    const response = await axios({
      method: "post",
      url: `http://${props.root}/public/classes/${name}`,
      data: {
        data: {
          name: name,
          dep: dep.toUpperCase(),
          number: number,
          description: description,
          messages: [],
        }
      }
    });
    if (callback) {
      callback(response);
    }
  }

  // Change handlers
  const nameHandler = event => {
    const val = event.target.value;
    if (val.includes(" ") || val.includes("/")) {
      setValidClass("danger");
    } else {
      checkClass(val, response => {
        if (val.length === 0) {
          setValidClass("info");
        } else if (response.status === 404) {
          setValidClass("success");
        } else {
          setValidClass("warning");
        }
      });
      setName(val);
    }
  };

  const descriptionHandler = event => {
    const val = event.target.value;
    setDescription(val);
  };

  const numberHandler = event => {
    const val = event.target.value;
    setNumber(val);
  };

  const departmentHandler = event => {
    const val = event.target.value;
    if (val.includes(" ") || val.includes("/") || val.length > 4) {
      setValidDep("danger");
    } else {
      if (val.length === 0) {
        setValidDep("info");
      } else {
        setValidDep("success");
      }
    }
    setDepartment(val);
  };

  const onSubmitHandler = () => {
    addClass(name, department, description, response => {
      props.setEditing(false);
      props.loadAllClasses(props.loadAllClassesCallback);
    });
  };

  const onExitHandler = () => {
    props.setEditing(false);
  };

  const content = (
    <div className="section is-dark">
      <article className="panel is-info content">
        <div className="panel-heading level">
          <div className="level-left">
            <p className="level-item">Classes</p>
          </div>
        </div>
        <div className="section">
          <div className="field">
            <label className="label">Class Name</label>
            <div className="control">
              <DebounceInput
                className={`input is-${validClass}`}
                minLength={0}
                debounceTimeout={400}
                onChange={nameHandler}
                type="text"
                placeholder="Class Name"
              />{" "}
            </div>
            <p className={`help is-${validClass}`}>
              {validClass === "success"
                ? "Class name is available."
                : validClass === "danger"
                ? "Class name is invalid."
                : validClass === "warning"
                ? "Class name is not available."
                : ""}
            </p>
          </div>
          <div className="field">
            <label className="label">Class Number</label>
            <div className="control">
              <input
                className="input is-info"
                onChange={numberHandler}
                placeholder="Write a short description here"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Department</label>
            <div className="control ">
              <input
                className={`input is-${validDep}`}
                type="text"
                placeholder="Department"
                onChange={departmentHandler}
              />
            </div>
            <p className={`help is-${validDep}`}>
              {validDep === "success"
                ? "Department code is valid."
                : validDep === "danger"
                ? "Department code is invalid."
                : ""}
            </p>
          </div>

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea is-info"
                onChange={descriptionHandler}
                placeholder="Write a short description here"
              />
            </div>
          </div>

          <div className="field is-grouped">
            <p className="control">
              <button className="button is-success" onClick={onSubmitHandler}>
                Create
              </button>
            </p>
            <p className="control">
              <button className="button is-danger  " onClick={onExitHandler}>
                Back
              </button>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
  return content;
}

export default AddClass;
