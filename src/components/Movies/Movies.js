import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesMore from "../MoviesMore/MoviesMore";
import Footer from "../Footer/Footer";
import { cards } from "../../utils/constants";

function Movies() {
  return (
    <div className="page">
      <Header loggedIn={true} />
      <SearchForm />
      <MoviesCardList cards={cards} />
      {cards.length === 0 ? null : <MoviesMore />}
      <Footer />
    </div>
  );
}

export default Movies;
