import React from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CurrentClass(props) {
    if ( props.class) {
  const content = (
    <div className="content">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title"> <span className="card-header-icon has-text-info has-text-heavy">{props.class.dep}</span>{props.class.name}</p>
           
          </header>
          <div class="card-content">
            <div class="content">
              {props.class.description}
              <br />
            </div>
          </div>
          <footer class="card-footer">
            
          </footer>
      </div>
    </div>
  );
  return content;
    } else {
        return <div></div>
    }
}

export default CurrentClass;
