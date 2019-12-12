import React from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CurrentClass(props) {
  const content = (
    <div className="content">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title"> <strong className="has-text-primary">{props.class.dep}</strong> {props.class.name}</p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true" />
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              {props.class.description}
              <br />
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">
              Save
            </a>
            <a href="#" class="card-footer-item">
              Edit
            </a>
            <a href="#" class="card-footer-item">
              Delete
            </a>
          </footer>
      </div>
    </div>
  );
  return content;
}

export default CurrentClass;
