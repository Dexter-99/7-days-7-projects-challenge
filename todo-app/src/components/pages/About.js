import React from "react";
import { Link } from "react-router-dom";
export const About = () => {
  return (
    <div className="container">
      <h1>About page</h1>
      <p>This is a Todo App</p>
      <Link to="/" className="btn btn-primary ">
        Go Back
      </Link>
    </div>
  );
};
export default About;
