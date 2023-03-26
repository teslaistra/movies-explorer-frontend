import React, { useEffect } from "react";
import "./MoviesCard.css";
import deleteImage from "../../images/delete.svg";

function MoviesCard({
  name,
  duration,
  image,
  isLiked,
  onLike,
  onDisLike,
  youtubeLink,
  fullCard,
  onlySaved,
}) {
  const [isLikeClicked, setisLikeClicked] = React.useState(isLiked);
  const allFilms = JSON.parse(localStorage.getItem("films"));
  const savedMovies = JSON.parse(localStorage.getItem("savedFilms"));
  const [isDeleted, setisDeleted] = React.useState(false);

  const films = { ...allFilms, savedMovies };
  useEffect(() => {
    setisLikeClicked(isLiked);
  }, [isLiked]);

  function LikeClick() {
    if (isLikeClicked) {
      onDisLike(getMovieIdFromSavedMovies());
    } else {
      onLike(createMovieToSave());
    }
    setisLikeClicked(!isLikeClicked);
  }

  function deleteLikeClick() {
    onDisLike(getMovieIdFromSavedMovies());
    setisLikeClicked(!isLikeClicked);
    setisDeleted(true);
  }

  function getMovieIdFromSavedMovies() {
    const movie = films.savedMovies.find(
      (movie) => movie.movieId === fullCard.id
    );
    return movie._id;
  }

  function createMovieToSave() {
    const movie = {
      country: fullCard.country,
      director: fullCard.director,
      duration: fullCard.duration,
      year: fullCard.year,
      description: fullCard.description,
      image: image,
      trailerLink: fullCard.trailerLink,
      thumbnail: image,
      movieId: fullCard.id,
      nameRU: fullCard.nameRU,
      nameEN: fullCard.nameEN,
    };
    return movie;
  }

  return (
    <div className={`movie-card ` + (isDeleted ? 'movie-card_status_deleted' : '')}>
      <a
        href={youtubeLink}
        target="_blank"
        rel="noreferrer"
        className="movie-card__link"
      >
        <img className="movie-card__image" src={image} alt="афиша фильма"></img>
      </a>
      <div className="movie-card__info">
        <div className="movie-card__meta-info">
          <h3 className="movie-card__film-name">{name}</h3>
          <p className="movie-card__timing">{duration}</p>
        </div>

        {onlySaved ? (
          <button className="movie-card__delete" onClick={deleteLikeClick}>
            <img src={deleteImage} alt="delete"></img>
          </button>
        ) : (
          <button
            onClick={LikeClick}
            className={`movie-card__is-liked ${
              isLikeClicked && "movie-card__liked"
            }`}
          ></button>
        )}
      </div>
    </div>
  );
}

export default MoviesCard;
