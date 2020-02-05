import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import About from "./components/pages/About";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
// import uuid from "uuid";
import axios from "axios";
class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }
  async componentDidMount() {
    let res = await axios.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    const data = await res.data;
    this.setState({ todos: data });
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
    console.log("event called");
    // axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
    //   this.setState({
    //     todos: [
    //       ...this.state.todos.filter(todo => {
    //         if (id === todo.id) {
    //           return false;
    //         } else {
    //           return true;
    //         }
    //       })
    //     ]
    //   })
    // );
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
  };
  CreateTodo = text => {
    const obj = {
      title: text,
      completed: false
    };
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        body: JSON.stringify(obj)
      })
      .then(response => response.data)
      .then(json => console.log(json));

    this.setState({ todos: [...this.state.todos, obj] });
    console.log(obj);
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route
            exact
            path="/"
            render={props => (
              <Fragment>
                <AddTodo onCreateTodo={this.CreateTodo} />
                <Todos
                  todos={this.state.todos}
                  onHandleCompleted={this.handleCompleted}
                  onHandleDelete={this.handleDelete}
                />
              </Fragment>
            )}
          />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
