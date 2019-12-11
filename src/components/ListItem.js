import React, {Component} from '../../node_modules/react';
import {connect} from '../../node_modules/react-redux';
import {completeToDo} from '../actions';
import { MdDelete } from 'react-icons/md';


var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
class ListItem extends Component {
  completeClick = completeTodoId => {
    const {completeToDo} = this.props;
    completeToDo(completeTodoId);
  };
  render() {
    const{todoId, todo} = this.props;
    return (
      <div key="toDoName" className="col s10 offset-s1 to-do-list-item black">
        <h4>
          {todo.title} <div><strong>Posted: {date} at {time}</strong></div>
          <span 
            onClick={() => this.completeClick(todoId)}
            className="complete-todo-item waves-effect waves-light blue lighten-5 blue-text text-darken-4 btn"
          >
            <MdDelete />
          </span>
        </h4>
      </div>
    );
  }
}

export default connect(null, {completeToDo})(ListItem);