import React, { Component } from "react";

export class AddTodo extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  onChange = e => {
    this.setState({ title: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    if (!this.state.title) return;
    else this.props.onCreateTodo(this.state.title);
  };
  render() {
    return (
      <div class="container mb-5">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Add Todo"
            className="form-control mb-3"
            value={this.state.title}
            onChange={this.onChange}
            required
          />
          <input
            type="submit"
            value="Submit"
            className="btn btn-block btn-primary"
          />
        </form>
      </div>
    );
  }
}

export default AddTodo;
