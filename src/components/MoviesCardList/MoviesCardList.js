import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { FilmsContext } from "../../contexts/FilmsContext";

function MoviesCardList({ cards, onLike, onDisLike }) {
  const films = React.useContext(FilmsContext);



  const cardsList = cards.map((card) => (
    console.log(films.savedMovies.some((movie) => movie.movieId === card.id)),
    console.log(card.id),
    <MoviesCard
      name={card.nameRU}
      duration={`${Math.trunc(card.duration / 60)}ч${card.duration % 60}м`}
      isLiked={films.savedMovies.some((movie) => movie.movieId === card.id)}
      image={'https://api.nomoreparties.co'+card.image.url}
      youtubeLink={card.trailerLink}
      onLike={onLike}
      onDisLike={onDisLike}
      key={card.movieId}
      fullCard={card}
    />
  ));

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">{cardsList.length === 0 ? <h2 className="movies-card-list__no-films">Фильмы не найдены</h2> : cardsList}</div>
    </section>
  );
}

export default MoviesCardList;
