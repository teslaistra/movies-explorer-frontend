import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { cards } from "../../utils/constants";
import MoviesMore from "../MoviesMore/MoviesMore";
import Footer from "../Footer/Footer";

function SavedMovies() {
  const likedCards = cards.filter((card) => card.isLiked === true);

  return (
    <div className="saved-movies">
      <div className="saved-movies__container">
        <Header loggedIn={true} />
        <SearchForm />
        <MoviesCardList cards={likedCards} />
        <MoviesMore />
      </div>

      <Footer />
    </div>
  );
}

export default SavedMovies;
