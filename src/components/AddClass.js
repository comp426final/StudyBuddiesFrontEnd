import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddClass(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [validClass, setValidClass] = useState("primary");

  // API requests
  async function checkClass(name, callback) {
    const response = await axios({
      method: "post",
      url: `http://${props.root}/public/checkClass`,
      data: {
        data: { name: name }
      }
    });
    if (callback) {
      callback(response);
    }
  }

  async function addClass(name, dep, description, callback) {
    const response = await axios({
      method: "post",
      url: `http://${props.root}/public/classes/${name}`,
      data: {
        data: {
          name: name,
          dep: dep,
          description:
          description,
          messages: [],
          members: []
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
    checkClass(val, response => {
      if (val.length === 0) {
        setValidClass("primary");
      } else if (response.status === 200) {
        setValidClass("success");
      } else {
        setValidClass("danger");
      }
    });
    setName(val);
  };

  const descriptionHandler = event => {
    const val = event.target.value;
    setDescription(val);
  };

  const departmentHandler = event => {
    const val = event.target.value;
    setDepartment(val);
  };

  const onSubmitHandler = () => {
    addClass(name, department, description, response => {
      props.setEditing(false);
    });
  };

  const content = (
    <div className="section is-dark">
      <article className="panel is-primary content">
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
                debounceTimeout={300}
                onChange={nameHandler}
                type="text"
                placeholder="Class Name"
              />{" "}
            </div>
          </div>

          <div className="field">
            <label className="label">Department</label>
            <div className="control ">
              <input
                className="input"
                type="text"
                placeholder="Department"
                onChange={departmentHandler}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea"
                onChange={descriptionHandler}
                placeholder="Write a short description here"
              />
            </div>
          </div>

          <div className="field">
            <p className="control">
              <button className="button" onClick={onSubmitHandler}>
                Create
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
