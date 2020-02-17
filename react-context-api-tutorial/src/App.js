import React from "react";
import "./App.css";
import Navbar from "./Layouts/Navbar";
import Movies from "./Movies/Movies";
import MovieState from "./Context/MovieState";
function App() {
  return (
    <MovieState>
      <div className="App">
        <Navbar />
        <Movies />
      </div>
    </MovieState>
  );
}

export default App;
