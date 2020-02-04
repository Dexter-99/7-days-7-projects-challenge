import React, { Component } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import uuid from "uuid";
class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [
        {
          title: "Learn React.js",
          id: 1,
          completed: false
        },
        {
          title: "Learn Java",
          id: 2,
          completed: false
        },
        {
          title: "Learn Theory of Computation",
          id: 3,
          completed: false
        }
      ]
    };
  }
  handleCompleted = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (id === todo.id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };
  handleDelete = id => {
    this.setState({
      todos: [
        ...this.state.todos.filter(todo => {
          if (id === todo.id) {
            return false;
          } else {
            return true;
          }
        })
      ]
    });
  };
  CreateTodo = text => {
    const obj = {
      title: text,
      id: uuid.v4(),
      completed: false
    };
    this.setState({ todos: [...this.state.todos, obj] });
    console.log(obj);
  };
  render() {
    return (
      <div className="App">
        <h1 className="bg-primary text-white py-3 text-center mb-4">
          TODO APP
        </h1>
        <AddTodo onCreateTodo={this.CreateTodo} />
        <Todos
          todos={this.state.todos}
          onHandleCompleted={this.handleCompleted}
          onHandleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
