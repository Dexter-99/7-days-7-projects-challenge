import React, { Component } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
class Todos extends Component {
  render() {
    return (
      <div className="container">
        {this.props.todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onHandleCompleted={this.props.onHandleCompleted}
            onHandleDelete={this.props.onHandleDelete}
          />
        ))}
      </div>
    );
  }
}
Todos.propTypes = {
  todos: PropTypes.array.isRequired
};

export default Todos;
