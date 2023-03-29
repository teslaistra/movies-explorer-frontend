import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards, onLike, onDisLike, onlySaved, savedFilms }) {
  const cardsList = cards.map((card) => (
    <MoviesCard
      name={card.nameRU}
      duration={`${Math.trunc(card.duration / 60)}ч${card.duration % 60}м`}
      isLiked={savedFilms.some((movie) => movie.movieId === card.id)}
      image={"https://api.nomoreparties.co" + card.image.url}
      youtubeLink={card.trailerLink}
      onLike={onLike}
      onDisLike={onDisLike}
      key={card.movieId}
      fullCard={card}
      onlySaved={onlySaved}
    />
  ));
  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">
        {cardsList.length === 0 ? (
          <h2 className="movies-card-list__no-films">Фильмы не найдены</h2>
        ) : (
          cardsList
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;
