import React, { useContext } from "react";
import MovieContext from "../Context/MovieContext";
import Movie from "./Movie";
const Movies = () => {
  const [movies, setMovies] = useContext(MovieContext);
  return (
    <div className="container grid-3">
      {movies.map(movie => (
        <Movie item={movie} />
      ))}
    </div>
  );
};
export default Movies;
