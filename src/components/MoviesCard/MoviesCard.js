import React from "react";
import "./MoviesCard.css";

function MoviesCard({ name, duration, image, isLiked, onLike }) {
  function LikeClick() {
    setisLikeClicked(!isLikeClicked);
    //onLike(isLikeClicked);
  }

  const [isLikeClicked, setisLikeClicked] = React.useState(isLiked);

  return (
    <div className="movie-card">
      <img className="movie-card__image" src={image} alt="афиша фильма"></img>
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
