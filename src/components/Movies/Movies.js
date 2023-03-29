import React, { useEffect } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesMore from "../MoviesMore/MoviesMore";
import Footer from "../Footer/Footer";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";

function Movies({
  moreFilms,
  numberOfMovies,
  onLike,
  onDisLike,
  movies,
  savedFilms,
}) {
  const [cards, setCards] = React.useState(movies.slice(0, numberOfMovies));

  const [filteredMovies, setFilteredMovies] = React.useState([]);

  useEffect(() => {
    setCards(movies.slice(0, numberOfMovies));
  }, [numberOfMovies, movies]);

  function handleSearch() {
    const isShortMovies = JSON.parse(localStorage.getItem("isShortMovies"));
    const search = localStorage.getItem("search");

    let foundFilms = [];

    if (search === "" || search == null) {
      foundFilms = movies.filter(
        (movie) =>
          (movie.duration <= SHORT_MOVIE_DURATION && isShortMovies) ||
          !isShortMovies
      );
    } else {
      foundFilms = movies.filter(
        (movie) =>
          (movie.nameRU.toLowerCase().includes(search.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(search.toLowerCase())) &&
          ((movie.duration <= SHORT_MOVIE_DURATION && isShortMovies) ||
            !isShortMovies)
      );
    }
    setCards(foundFilms.slice(0, numberOfMovies));

    setFilteredMovies(foundFilms);
  }

  useEffect(() => {
    handleSearch();

    //setCards(filteredMovies.slice(0, numberOfMovies));

    // return () => {
    //   localStorage.setItem("moreFilmsNumber", 0);
    //   localStorage.setItem("numberOfMovies", 0);
    // };
  }, [numberOfMovies]);

  useEffect(() => {
    setCards(filteredMovies.slice(0, numberOfMovies));
  }, [numberOfMovies, filteredMovies, movies]);

  return (
    <div className="movies">
      <div className="movies__container">
        <Header loggedIn={true} />
        <SearchForm handleSearch={handleSearch} />
        <MoviesCardList
          cards={cards}
          numberOfMovies={numberOfMovies}
          onLike={onLike}
          onDisLike={onDisLike}
          onlySaved={false}
          savedFilms={savedFilms}
        />
        {cards.length === 0 ||
        filteredMovies.length <= numberOfMovies ? null : (
          <MoviesMore moreFilms={moreFilms} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Movies;
