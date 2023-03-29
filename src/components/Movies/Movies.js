import React, { useEffect } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesMore from "../MoviesMore/MoviesMore";
import Footer from "../Footer/Footer";

function Movies({ moreFilms, numberOfMovies, onLike, onDisLike, movies }) {
  const [cards, setCards] = React.useState(movies.slice(0, numberOfMovies));

  const [filteredMovies, setFilteredMovies] = React.useState(movies);

  function handleSearch() {
    const isShortMovies = JSON.parse(localStorage.getItem("isShortMovies"));
    const search = localStorage.getItem("search");

    const filmsToSearch = JSON.parse(localStorage.getItem("movies"));
    console.log(filmsToSearch);

    let foundFilms = [];
      console.log(filmsToSearch)

    if (search === "" || search == null) {
      foundFilms = filmsToSearch.filter(
        (movie) => (movie.duration <= 40 && isShortMovies) || !isShortMovies
      );
    } else {
      foundFilms = filmsToSearch.filter(
        (movie) =>
          (movie.nameRU.toLowerCase().includes(search.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(search.toLowerCase())) &&
          ((movie.duration <= 40 && isShortMovies) || !isShortMovies)
      );
    }
    console.log(foundFilms);
    setCards(foundFilms.slice(0, numberOfMovies));

    localStorage.setItem("foundFilms", JSON.stringify(foundFilms));
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
    (
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
          />
          {cards.length === 0 ||
          filteredMovies.length <= numberOfMovies ? null : (
            <MoviesMore moreFilms={moreFilms} />
          )}
        </div>
        <Footer />
      </div>
    )
  );
}

export default Movies;
