import React, { useEffect } from "react";
import "./MoviesCard.css";
import { FilmsContext } from "../../contexts/FilmsContext";

function MoviesCard({ name, duration, image, isLiked, onLike, onDisLike, youtubeLink, fullCard }) {
  const films = React.useContext(FilmsContext);
  const [isLikeClicked, setisLikeClicked] = React.useState(isLiked);

  useEffect(() => {
    setisLikeClicked(isLiked);
  }, [isLiked]);


  function LikeClick() {
    if (isLikeClicked) {
      onDisLike(getMovieIdFromSavedMovies());
    } else {
      onLike(createMovieToSave());
    }
    // setisLikeClicked(!isLikeClicked);
  }

 function getMovieIdFromSavedMovies() {
    const movie = films.savedMovies.find((movie) => movie.movieId === fullCard.id);
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
    <div className="movie-card">
      <a href={youtubeLink} target="_blank" rel="noreferrer" className="movie-card__link">
        <img className="movie-card__image" src={image} alt="афиша фильма"></img>
      </a>
      <div className="movie-card__info">
        <div className="movie-card__meta-info">
          <h3 className="movie-card__film-name">{name}</h3>
          <p className="movie-card__timing">{duration}</p>
        </div>

        <button
          onClick={LikeClick}
          className={`movie-card__is-liked ${
            isLikeClicked && "movie-card__liked"
          }`}
        ></button>
      </div>
    </div>
  );
}

export default MoviesCard;
