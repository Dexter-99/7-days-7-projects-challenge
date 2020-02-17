import React, { useState } from "react";
import MovieContext from "../Context/MovieContext";

const MovieState = props => {
  const [movies, setMovies] = useState([
    {
      name: "Harry Potter",
      id: 1,
      price: "$10"
    },
    {
      name: "Inception",
      id: 2,
      price: "$20"
    },
    {
      name: "Star Wars",
      id: 3,
      price: "$15"
    }
  ]);
  return (
    <MovieContext.Provider value={[movies, setMovies]}>
      {props.children}
    </MovieContext.Provider>
  );
};
export default MovieState;
