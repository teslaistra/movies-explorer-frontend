import React, { useEffect } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesMore from "../MoviesMore/MoviesMore";
import Footer from "../Footer/Footer";
import { moviesApi } from "../../utils/MoviesApi";

function Movies({ moreFilms, numberOfMovies, onLike, onDisLike, onlySaved }) {
  const [cards, setCards] = React.useState([]);

  const [savedMovies, setSavedMovies] = React.useState(
    JSON.parse(localStorage.getItem("savedFilms"))
  );
  const [films, setFilms] = React.useState(
    JSON.parse(localStorage.getItem("movies"))
  ); // [
  const [filteredMovies, setFilteredMovies] = React.useState(
    JSON.parse(localStorage.getItem("foundFilms")) || []
  );
  const [filteredMoviesSearch, setFilteredMoviesSaved] = React.useState(
    (JSON.parse(localStorage.getItem("foundFilmsSaved")) || []).filter((movie) => {
      return savedMovies.some((savedMovie) => {
        return savedMovie.movieId === movie.id;
      });
    })
  );

  useEffect(() => {
    localStorage.setItem("moreFilmsNumber", 0);
    localStorage.setItem("numberOfMovies", 0);
    

    if (filteredMovies.length === 0) {
      moviesApi
        .getMovies()
        .then((res) => {
          setFilms(res);
          localStorage.setItem("foundFilms", JSON.stringify(res));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          const res = JSON.parse(localStorage.getItem("foundFilms"));
          setFilteredMovies(res);
          setCards(res.slice(0, numberOfMovies));
        });
    }

    if (onlySaved) {
      setCards(
        filteredMoviesSearch
          .filter((movie) => {
            return savedMovies.some((savedMovie) => {
              return savedMovie.movieId === movie.id;
            });
          })
          .slice(0, numberOfMovies)
      );
    } else {
      setCards(filteredMovies.slice(0, numberOfMovies));
    }

    // return () => {
    //   localStorage.setItem("moreFilmsNumber", 0);
    //   localStorage.setItem("numberOfMovies", 0);
    // };
  }, [
    numberOfMovies,
    onlySaved,
    savedMovies,
    filteredMoviesSearch,
    filteredMovies,
    setCards,
    setFilteredMovies,
    setFilteredMoviesSaved,
    setFilms,
  ]);

  function handleSearch() {
    const isShortMovies = JSON.parse(localStorage.getItem("isShortMovies"));
    const search = localStorage.getItem("search");
    const filmsToSearch = onlySaved
      ? films.filter((movie) => {
          return savedMovies.some((savedMovie) => {
            return savedMovie.movieId === movie.id;
          });
        })
      : films;

    let foundFilms = [];

    if (search === "" || search === undefined) {
      foundFilms = filmsToSearch.filter(
        (movie) => (movie.duration <= 40 && isShortMovies) || !isShortMovies
      );

      setFilteredMovies(foundFilms);
    } else {
      foundFilms = filmsToSearch.filter(
        (movie) =>
          (movie.nameRU.toLowerCase().includes(search.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(search.toLowerCase())) &&
          ((movie.duration <= 40 && isShortMovies) || !isShortMovies)
      );
    }

    setCards(foundFilms.slice(0, numberOfMovies));
    if (onlySaved) {
      localStorage.setItem("foundFilmsSaved", JSON.stringify(foundFilms));
      setFilteredMoviesSaved(foundFilms);
    } else {
      localStorage.setItem("foundFilms", JSON.stringify(foundFilms));
      setFilteredMovies(foundFilms);
    }
  }

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
          onlySaved={onlySaved}
        />
        {cards.length === 0 ||
        (onlySaved ? filteredMoviesSearch.length : filteredMovies.length) <=
          numberOfMovies ? null : (
          <MoviesMore moreFilms={moreFilms} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Movies;
