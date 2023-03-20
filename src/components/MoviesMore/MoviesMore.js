import React from "react";
import "./MoviesMore.css";

function MoviesMore({ moreFilms }) {
  return (
    <section className="movies-more">
      <div className="movies-more__container">
        <button className="movies-more__button">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesMore;
