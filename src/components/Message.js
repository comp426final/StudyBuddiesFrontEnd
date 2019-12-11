import React from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Message(props) {
  const content = (
    <article className="media">
  <figure className="media-left">
    <p className="image is-64x64">
      <img src="https://bulma.io/images/placeholders/128x128.png"/>
    </p>
  </figure>
  <div className="media-content">
    <div className="content">
      <p>
        <strong>{props.author}</strong> <small>@johnsmith</small> <small>31m</small>
        <br/>
        {props.content}
      </p>
    </div>
    <nav className="level is-mobile">
      <div className="level-left">
        <a className="level-item">
          <span className="icon is-small"><i className="fas fa-reply"></i></span>
        </a>
        <a className="level-item">
          <span className="icon is-small"><i className="fas fa-retweet"></i></span>
        </a>
        <a className="level-item">
          <span className="icon is-small"><i className="fas fa-heart"></i></span>
        </a>
      </div>
    </nav>
  </div>
  <div className="media-right">
  </div>
</article>
  );
  return content;
}

export default Message;
