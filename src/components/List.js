import React, {Component} from '../../node_modules/react';
import {connect} from '../../node_modules/react-redux';
import _ from '../../node_modules/lodash';
import * as actions from '../actions';
import ListItem from './ListItem';
import "../css/list.css";
import { FaPlusCircle, FaWindowClose } from 'react-icons/fa';

class List extends Component {
  state = {
    showForm: false,
    formValue: ""
  };

  inputChange = event => {
    this.setState({formValue: event.target.value});
  };

  formSubmit = event => {
    const {formValue} = this.state;
    const {addToDo} = this.props;
    event.preventDefault();
    addToDo({title: formValue});
    this.setState({formValue: ""});
  };

  renderForm = () => {
    const {showForm, formValue} = this.state;
    if (showForm) {
      return (
        <div id="todo-add-form" className="col s10 offset-s1">
          <form onSubmit={this.formSubmit}>
            <div className="input-field">
              <input className="input is-primary"
                value={formValue}
                onChange={this.inputChange}
                id="toDoNext"
                type="text"
                placeholder=" Add New Announcement"
              />
              <label htmlFor="toDoNext"></label>
            </div>
          </form>
        </div>
      );
    }
  };
  renderToDo() {
    const {data} = this.props;
    const toDos = _.map(data, (value, key) => {
      return <ListItem key={key} todoId={key} todo={value} />;
    });
    if (!_.isEmpty(toDos)) {
      return toDos;
    }
    return (
      <div className="col s10 offset-s1 center-align">
        {/* <h4>No annoucnements</h4> */}
      </div>
    );
  }
  componentWillMount() {
    this.props.fetchToDos();
  }
  render() {
    const {showForm} = this.state;
    return (
      <div className="to-do-list-container">
        <div className="row">
          {this.renderForm()}
          {this.renderToDo()}
        </div>
        <div className="fixed-action-btn">
          <span 
            onClick={() => this.setState({showForm: !showForm})}
            className="btn-floating btn-large black darken-4"
          >
          {showForm ? (
            <div>
            <FaWindowClose/>
            </div>
          ) : (
            <FaPlusCircle/>
          )}
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({data}) => {
  return {
    data
  }
}

export default connect(mapStateToProps, actions)(List);