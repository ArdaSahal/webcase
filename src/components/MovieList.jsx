import React, { useState } from "react";
import "./MovieList.css";

const MovieList = ({ categoryName, movieArr }) => {
  if (!movieArr || movieArr.length <= 0) {
    return <></>;
  }
  return (
    <div className="movieList-container">
      <div>{categoryName}</div>
      <div className="movieList-movies">
        {movieArr.slice(0, 5)?.map((e) => {
          return <img src={e.posters[1].url}></img>;
        })}
      </div>
    </div>
  );
};

export default MovieList;
