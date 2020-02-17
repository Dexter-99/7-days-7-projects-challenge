import React from "react";

const Movie = ({ item: { name, price, id } }) => {
  return (
    <div className="card text-center">
      <h2 className="lead">{name}</h2>
      <p className="lead">{price}</p>
      <p className="lead">{id}</p>
    </div>
  );
};
export default Movie;
