import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesMore from "../MoviesMore/MoviesMore";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";

function SavedMovies({ moreFilms, numberOfMovies, onLike, onDisLike, loggedIn}) {
  // const likedCards = cards.filter((card) => card.isLiked === true);

  return (
    <div className="saved-movies">
      <Movies onlySaved={true} onLike={onLike} onDisLike={onDisLike} numberOfMovies={numberOfMovies} loggedIn={loggedIn} moreFilms={moreFilms} />
    </div>
  );
}

export default SavedMovies;
