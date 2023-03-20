import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards }) {
  const cardsList = cards.map((card) => (
    <MoviesCard
      name={card.name}
      duration={card.duration}
      isLiked={card.isLiked}
      image={card.image}
    />
  ));

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">{cardsList.length === 0 ? <h2 className="movies-card-list__no-films">Фильмы не найдены</h2> : cardsList}</div>
    </section>
  );
}

export default MoviesCardList;
