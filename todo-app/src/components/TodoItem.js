import React, { Component } from "react";
import PropTypes from "prop-types";
class TodoItem extends Component {
  getStyle = () => {
    return {
      fontSize: "1.5rem",
      textDecoration: this.props.todo.completed ? "line-through" : "none",
      textDecorationColor: "royalblue"
    };
  };
  render() {
    const { id, title } = this.props.todo;
    return (
      <li className="list-group-item ">
        <p style={this.getStyle()} className="lead mb-0">
          <label className="checkbox mr-3 align-baseline">
            <input
              type="checkbox"
              onChange={() => this.props.onHandleCompleted(id)}
            />
          </label>

          {title}
          <button
            className="btn-primary button  text-center mr-3"
            onClick={() => this.props.onHandleDelete(id)}
          >
            x
          </button>
        </p>
      </li>
    );
  }
}
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  key: PropTypes.number.isRequired
};

export default TodoItem;
