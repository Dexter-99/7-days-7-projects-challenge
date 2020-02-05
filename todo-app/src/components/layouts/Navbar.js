import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Navbar extends Component {
  render() {
    return (
      <div className="navbar navbar-dark bg-primary navbar-expand-lg mb-4">
        <div className="container">
          <h1 className="navbar-brand">TODO APP</h1>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navbar;
